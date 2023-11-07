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
  assignChoice: string = '';
  showAddTask: boolean = false;
  subscription: Subscription;
  subscription2: Subscription;
  asssignSChoice: string[] = ['azamss', 'aina', 'bang'];
  choices: string[] = ['Open', 'In Progress', 'Closed'];
  tasks: Task = {
    id: undefined,
    text: '',
    day: '',
    reminder: false,
    status: '',
    assign: '',
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
      assign: '',
    };
    console.log(this.tasks.id);

    if (!show && this.tasks.id !== undefined) {
      this.tasks = clearTask;
      this.text = '';
      this.day = '';
      this.reminder = false;
      this.selectedChoice = '';
      this.assignChoice = '';
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

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
      status: this.selectedChoice,
      assign: this.assignChoice,
    };
    const editTask: Task = {
      id: this.tasks.id,
      text: this.text,
      day: this.day,
      reminder: this.reminder,
      status: this.selectedChoice,
      assign: this.assignChoice,
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
      assign: '',
    };

    this.text = '';
    this.day = '';
    this.reminder = false;
    this.selectedChoice = '';
    this.assignChoice = '';
  }
  setDef(tasks: Task[]): void {
    this.tasks = tasks[0];
    this.text = tasks[0].text;
    this.day = tasks[0].day;
    this.reminder = tasks[0].reminder;
    tasks[0].status !== undefined
      ? (this.selectedChoice = tasks[0].status)
      : (this.selectedChoice = '');
    tasks[0].assign !== undefined
      ? (this.assignChoice = tasks[0].assign)
      : (this.assignChoice = '');
  }
}
