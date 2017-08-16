import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { slideLeftToRight, slideUp } from '../../shared/animations';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  animations: [slideUp]
})
export class EntryComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  constructor() { }

  ngOnInit() {
  }

}
