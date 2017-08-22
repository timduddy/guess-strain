import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusDirective } from './focus.directive';
import { SearchPipe } from './search.pipe';
import { TitlePipe } from './title.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FocusDirective,
    SearchPipe,
    TitlePipe
  ],
   exports: [SearchPipe, TitlePipe]
})
export class SharedModule { }
