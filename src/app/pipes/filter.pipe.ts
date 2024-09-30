import { Pipe, type PipeTransform } from '@angular/core';
import type { STATE } from '../types/state.type';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform<T>(value: T, field: string, state: STATE): T {
    if (!Array.isArray(value)) return [] as T
    if (state === 'ALL')
      return value
    return value.filter((v) => v[field] === (state === 'COMPLETED')) as T
  }

}
