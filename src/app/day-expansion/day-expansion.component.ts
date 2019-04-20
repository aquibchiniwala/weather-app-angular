import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-expansion',
  templateUrl: './day-expansion.component.html',
  styleUrls: ['./day-expansion.component.css']
})
export class DayExpansionComponent implements OnInit {

  @Input()
  forecast: any;
  today: string = new Date().toDateString();
  constructor() { }

  ngOnInit() {
  }

}
