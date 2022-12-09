import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false,
})
export class OrderbyPipe implements PipeTransform {
  transform(array: Array<any>, args: string): Array<any> {
    if (array == undefined || array == null) {
      return array;
    }

    array.sort((a: any, b: any) => {
      if (this.getPropByString(a, args) < this.getPropByString(b, args)) {
        return -1;
      } else if (
        this.getPropByString(a, args) > this.getPropByString(b, args)
      ) {
        return 1;
      }
      return 0;
    });
    return array;
  }

  getPropByString(obj: any, propString: string) {
    if (!propString) return obj;
    let prop,
      props = propString.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
      prop = props[i];
      let candidate = obj[prop];
      if (candidate !== undefined) {
        obj = candidate;
      } else {
        break;
      }
    }
    return obj[props[i]];
  }
}
