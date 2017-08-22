import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], value: string): any[] {

    if (items) {
      if (value) {
          return items.filter(
            it =>
            (it['name'].toLowerCase().indexOf(value.toLowerCase()) > -1)
            || (it['email'].toLowerCase().indexOf(value.toLowerCase()) > -1)
            // || (it['phone'].toLowerCase().indexOf(value.toLowerCase()) > -1)
          );
      }
      return items;
    }
    return [];

  }

}
