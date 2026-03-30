import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpaces',
  standalone: true,
})
export class RemoveSpacesPipe implements PipeTransform {
  transform(value: unknown): string {
    if (value == null || typeof value !== 'string') {
      return '';
    }
    return value.replace(/-/g, ' ');
  }
}
