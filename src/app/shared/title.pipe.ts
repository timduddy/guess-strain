import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  public pieces: any;

  transform(value: any) {
    if (value) {
      value = value.toLowerCase();
      this.pieces = value.split(' ');
      for (let i in this.pieces) {
        this.pieces[i] = this.pieces[i].charAt(0).toUpperCase() + this.pieces[i].slice(1);
      }
      return this.pieces.toString().replace(/,/g, ' ');
    }
  }

}
