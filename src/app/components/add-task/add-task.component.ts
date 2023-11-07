import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  reminder: boolean = false;
  selectedChoice: string = '';
  showAddTask: boolean = false;
  subscription: Subscription;
  subscription2: Subscription;
  choices: string[] = [
    'Open         - task that are not yet owned',
    'In Progress  - task that is being worked',
    'Closed       - task that has been completed',
  ];
  tasks: Task = {
    id: undefined,
    text: '',
    day: '',
    reminder: false,
  };

  constructor(private uiService: UiService, private taskService: TaskService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = this.showaddtask(value)));

    this.subscription2 = this.taskService
      .onRefresh2()
      .subscribe((value) =>
        this.taskService
          .getTaskWithID(value)
          .subscribe((task) => this.setDef(task))
      );
  }
  showaddtask(show: boolean): boolean {
    const clearTask: Task = {
      id: undefined,
      text: '',
      day: '',
      reminder: false,
      status: '',
    };
    console.log(this.tasks.id);

    if (!show && this.tasks.id !== undefined) {
      this.tasks = clearTask;
      this.text = '';
      this.day = '';
      this.reminder = false;
      this.selectedChoice = '';
    }
    return show;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (!this.text) {
      alert('Please add a task!');
      return;
    }

    console.log(this.selectedChoice);

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
      status: this.selectedChoice,
    };
    const editTask: Task = {
      id: this.tasks.id,
      text: this.text,
      day: this.day,
      reminder: this.reminder,
      status: this.selectedChoice,
    };
    this.tasks.id !== undefined
      ? this.onEditTask.emit(editTask)
      : this.onAddTask.emit(newTask);

    this.tasks = {
      id: undefined,
      text: '',
      day: '',
      reminder: false,
      status: '',
    };

    this.text = '';
    this.day = '';
    this.reminder = false;
    this.selectedChoice = '';
  }
  setDef(tasks: Task[]): void {
    this.tasks = tasks[0];
    this.text = tasks[0].text;
    this.day = tasks[0].day;
    this.reminder = tasks[0].reminder;
    tasks[0].status !== undefined
      ? (this.selectedChoice = tasks[0].status)
      : (this.selectedChoice = '');
  }
  onNgxSelectDropdownSelect(select: string) {
    this.selectedChoice = select;
    console.log(this.selectedChoice);
    console.log("yooo");
    ;
  }
}
