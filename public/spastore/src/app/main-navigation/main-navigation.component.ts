import {Component, OnInit, ElementRef, HostListener, HostBinding} from '@angular/core';

@Component({selector: 'app-main-navigation', templateUrl: './main-navigation.component.html', styleUrls: ['./main-navigation.component.css']})
export class MainNavigationComponent implements OnInit {

  constructor(private elementRef : ElementRef) {}

  ngOnInit() {}

  @HostListener('mousedown', ['$event'])click(eventData) {

    
    if (eventData.target.id == 'navigationToggler') {
      this.elementRef.nativeElement.childNodes[0].style.width = '250px';
    }

    if (eventData.target.className == 'closebtn') {
      this.elementRef.nativeElement.childNodes[0].style.width = 0;
    }
  }

}
