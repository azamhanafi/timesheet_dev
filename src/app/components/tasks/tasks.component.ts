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
  TaskId: string ="";
  subscription2: Subscription;

  private subject = new Subject<any>();
  constructor(private taskService: TaskService, private uiService: UiService) {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    this.subscription = this.taskService
      .onRefresh()
      .subscribe((value) =>
        this.taskService
          .getTasks()
          .subscribe((tasks) =>
            value !== ''
              ? (this.tasks = this.tasks.filter((t) => t.text.includes(value)))
              : (this.tasks = tasks)
          )
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

    console.log("hhhhhheeediit");
    this.taskService.updateTaskReminder(task).subscribe(
      
      (updatedtask) => (this.tasks = this.update(this.tasks,updatedtask))
      
    );
    }
  update(arg0: Task[], updatedtask: Task): Task[] {
    console.log(arg0);
    const task2 = arg0.filter((t) => t.id === updatedtask.id)
    console.log(task2);
    const taskIndex = arg0.indexOf(task2[0]);
    console.log(taskIndex);
    if (taskIndex !== -1) {
      console.log(arg0.splice(taskIndex, 1, updatedtask));
      return(arg0)
    }else{
      return(arg0)

    }

  }
}
