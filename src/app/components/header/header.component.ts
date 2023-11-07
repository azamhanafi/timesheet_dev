import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  tittle: string = 'Task tracker';
  showAddTask: boolean = false;
  subscription: Subscription;
  subscription2: Subscription;
  tasks: Task[] = [];

  constructor(private uiService: UiService, private taskService: TaskService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
    this.subscription2 = this.taskService
      .onRefresh()
      .subscribe((value) => (this.taskService.getTasks().subscribe((tasks) => (
        value !== ""?(this.tasks = this.tasks.filter((t) => t.text.includes(value))):this.tasks = tasks
        ))));
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  toggleAddTask() {
    this.uiService.toggleAddTask();
  }
  searchQuerry(querry: string) {
    console.log(querry);
    this.taskService.refreshTask(querry);
    console.log(querry);
  }
}
