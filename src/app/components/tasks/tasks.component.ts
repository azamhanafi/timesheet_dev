import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UiService } from '../../services/ui.service';
import { Task } from '../../Task';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Task[] = [];
  subscription: Subscription;
  showAddTask: boolean = false;
  TaskId: string = '';
  subscription2: Subscription;
  countFrom: number = 0;
  countTo: number = 0;

  private subject = new Subject<any>();
  constructor(private taskService: TaskService, private uiService: UiService) {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    this.subscription = this.taskService
      .onRefresh()
      .subscribe((value) =>
        this.taskService
          .getTasks()
          .subscribe((tasks) => this.filterQuerry(value, tasks))
      );

    this.subscription2 = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }
  editTask(task: Task) {
    this.taskService.refreshTask2(String(task.id));
    this.uiService.openTask();
    window.scrollTo(0, 0);
  }
  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }
  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
  editTask2(task: Task) {
    this.taskService
      .updateTaskReminder(task)
      .subscribe(
        (updatedtask) => (this.tasks = this.update(this.tasks, updatedtask))
      );
  }
  update(arg0: Task[], updatedtask: Task): Task[] {
    console.log(arg0);
    const task2 = arg0.filter((t) => t.id === updatedtask.id);
    console.log(task2);
    const taskIndex = arg0.indexOf(task2[0]);
    console.log(taskIndex);
    if (taskIndex !== -1) {
      console.log(arg0.splice(taskIndex, 1, updatedtask));
      return arg0;
    } else {
      return arg0;
    }
  }
  SortFrom(trigger :any) {

    console.log("bb");
    this.countTo=0;
    this.countFrom >= 2
      ? (this.countFrom = 0)
      : (this.countFrom = this.countFrom + 1);
      this.SortTaskFrom()
  }
  SortTo(trigger :any) {

    console.log("bb");
    this.countFrom=0;
    this.countTo >= 2
      ? (this.countTo = 0)
      : (this.countTo = this.countTo + 1);
      this.SortTaskTo()
  }
  filterQuerry(querry: string, arg0: Task[]) {
    querry !== ''
      ? (this.tasks = this.tasks.filter((t) => t.text.includes(querry)))
      : (this.tasks = arg0);
      this.countFrom !==0 ? this.SortTaskFrom() : this.SortTaskTo();
  }
  SortTaskFrom() {
    switch (this.countFrom) {
      case 1:
        this.tasks.sort((a, b) => {
          const aFromDate = a.fromDate ?? new Date(0);
          const bFromDate = b.fromDate ?? new Date(0);
          //ascending
          // Compare the fromDate properties using the ternary operator
          return aFromDate < bFromDate ? -1 : aFromDate > bFromDate ? 1 : 0;
        });

        break;
      case 2:
        this.tasks.sort((a, b) => {
          const aFromDate = a.fromDate ?? new Date(0);
          const bFromDate = b.fromDate ?? new Date(0);
          //descending
          // Compare the fromDate properties using the ternary operator
          return aFromDate < bFromDate ? 1 : aFromDate > bFromDate ? -1 : 0;
        });

        break;
      default:
        break;
    }
  }
  SortTaskTo() {
    switch (this.countTo) {
      case 1:
        this.tasks.sort((a, b) => {
          const aToDate = a.toDate ?? new Date(0);
          const bToDate = b.toDate ?? new Date(0);
          //ascending
          // Compare the fromDate properties using the ternary operator
          return aToDate < bToDate ? -1 : aToDate > bToDate ? 1 : 0;
        });

        break;
      case 2:
        this.tasks.sort((a, b) => {
          const aToDate = a.toDate ?? new Date(0);
          const bToDate = b.toDate ?? new Date(0);
          //descending
          // Compare the fromDate properties using the ternary operator
          return aToDate < bToDate ? 1 : aToDate > bToDate ? -1 : 0;
        });

        break;
      default:
        break;
    }
  }
}
