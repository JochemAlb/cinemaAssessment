import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readMore',
  standalone: true,
})
export class ReadMorePipe implements PipeTransform {
  transform(value: string, length: number, disabled = false): string {
    return disabled || value.length <= length
      ? value
      : `${value.slice(0, length)} ...`;
  }
}
