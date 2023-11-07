import { Component,OnInit,Input,Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faTimes,faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input()  task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;
  faPenToSquare=faPenToSquare;
  

  constructor() {}

  ngOnInit(): void {}
  

    onDelete(task: Task | undefined) {
    console.log(task);
    this.onDeleteTask.emit(task);
    
  }
  onToggle(task: Task | undefined) {
    this.onToggleReminder.emit(task);
  }
  onEdit(task: Task ) {
    console.log(task);
    this.onEditTask.emit(task);
    
  }

}
