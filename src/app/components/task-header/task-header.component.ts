import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faArrowsUpDown,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrls: ['./task-header.component.css'],
})
export class TaskHeaderComponent implements OnInit {
  @Output() onSortFrom: EventEmitter<boolean> = new EventEmitter();
  @Output() onSortTo: EventEmitter<boolean> = new EventEmitter();
  countFrom: number = 0;
  countTo: number = 0;
  alwaysTrue: boolean = true;

  faOrientation = faArrowsUpDown;
  faOrientation2 = faArrowsUpDown;
  constructor() {}
  ngOnInit(): void {}

  SortFrom() {
    console.log('yezza');
    this.onSortFrom.emit(this.alwaysTrue);
    this.countTo = 0;
    this.countFrom >= 2
      ? (this.countFrom = 0)
      : (this.countFrom = this.countFrom + 1);
      this.setFaOrientation();
  }
  SortTo() {
    console.log('yezza');
    this.onSortTo.emit(this.alwaysTrue);
    this.countFrom = 0;
    this.countTo >= 2 ? (this.countTo = 0) : (this.countTo = this.countTo + 1);
    this.setFaOrientation();
  }
  setFaOrientation() {
    switch (this.countFrom) {
      case 1:
        this.faOrientation = faArrowUp;
        break;
      case 2:
        this.faOrientation = faArrowDown;
        break;
      default:
        this.faOrientation = faArrowsUpDown;
        break;
    }

    switch (this.countTo) {
      case 1:
        this.faOrientation2 = faArrowUp;
        break;
      case 2:
        this.faOrientation2 = faArrowDown;
        break;
      default:
        this.faOrientation2 = faArrowsUpDown;
        break;
    }
  }
}
