import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, RendererFactory2 } from '@angular/core';
import { v4 } from 'uuid';

declare global {
  interface Window {
    // add you custom properties and methods
    CMS: {
      registerEventListener: (config: {
        name: string,
        handler: ({ }: any) => string
      }) => string
    }
  }
}

@Component({
  selector: 'home',
  template: `
    <!-- https://github.com/netlify/netlify-cms/blob/dea27c4001151b6d60a560a7564e1fd471563a69/website/content/docs/beta-features.md#custom-mount-element -->
    <!-- duplicating the identity widget w/o -->
    <div id="nc-root"></div>
  `,
})
export class LoadAdminComponent  {

  // try redirecting to static file


  private renderer2; constructor(
    private rendererFactory2: RendererFactory2,
    @Inject(DOCUMENT) private _document: Document,
    private window: Window

  ) {
    this.renderer2 = this.rendererFactory2.createRenderer(null, null);
  }

  ngAfterViewInit(): void {
    const script: HTMLScriptElement = this.renderer2.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js`;
    script.text = '';
    this.renderer2.appendChild(this._document.body, script);

    setTimeout(() => {
      // settimeout hack for now
      // TODO use polling at least
      this.window.CMS.registerEventListener({
        name: 'preSave',
        handler: ({ entry }) => {
          if (entry.get('slug')) {
            return;
          }
          return entry.get('data').set('id', v4());
        },
      });
    }, 5000);
  }
}
