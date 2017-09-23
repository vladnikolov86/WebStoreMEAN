import {Component, OnInit} from '@angular/core';

@Component({selector: 'app-desktop-nav', templateUrl: './desktop-nav.component.html', styleUrls: ['./desktop-nav.component.css']})
export class DesktopNavComponent implements OnInit {

  constructor() {

    this.menuItems = [
      {
        mainCategory: 'Козметика за лице',
        subCategories: [
          {
            name: 'Суха Кожа'
          }
        ]
      }, {
        mainCategory: 'Козметика за тяло'
      }, {
        mainCategory: 'Козметика за професионална'
      }
    ]
  }

  private menuItems : Array < Object >;

  ngOnInit() {}

}
