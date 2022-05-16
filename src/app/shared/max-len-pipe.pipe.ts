import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLen'
})
export class MaxLenPipe implements PipeTransform {

  transform(value: string, len: number): string {
    return value.substring(0, len);
  }

}
