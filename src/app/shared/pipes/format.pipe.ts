import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'format' })
export class FormatPipe implements PipeTransform {

  transform<T, R>(
    thisArg: T,
    project: (t: T, ...others: any[]) => R,
    ...args: any[]
  ): R {

    return project(thisArg, ...args)
  }
}
