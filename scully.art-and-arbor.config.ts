import { ScullyConfig, setPluginConfig } from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer';
setPluginConfig('md', { enableSyntaxHighlighting: true });

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "art-and-arbor",
  outDir: './dist/static',
  routes: {
    '/admin': {
      type: 'ignored'
    },
    '/murals/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./content/murals"
      }
    },
    '/species/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./content/species"
      }
    },
    '/trees/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./content/trees"
      }
    },
  }
};