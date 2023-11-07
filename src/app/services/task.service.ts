import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of,Subject } from 'rxjs';
import { Task } from '../Task';
import { TASKS } from '../mock-task';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  
  private apiUrl = 'http://localhost:5000/tasks';
  tasks: any;
  private subject = new Subject<any>();
  private subject2 = new Subject<any>();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    console.log(this.http.get<Task[]>(this.apiUrl))
    return this.http.get<Task[]>(this.apiUrl);
    
  }
  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }
  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }

  getTaskWithID(task: string): Observable<Task[]> {
    const url = `${this.apiUrl}/?id=${task}`;
    console.log(this.http.get<Task>(url));
    console.log("dr ko");
    console.log(url);
    return this.http.get<Task[]>(url);
  }
  onRefresh(): Observable<any> {
    console.log(this.subject.asObservable());
    return this.subject.asObservable();
    
  }
  onRefresh2(): Observable<any> {
    console.log("hhhhhh");
    console.log(this.subject2.asObservable());
    return this.subject2.asObservable();
    
  }
  refreshTask(tasks: string): void {
    this.tasks = tasks;
   if(tasks === null || tasks === undefined )
   {
    this.tasks="";
    
   }
   console.log(this.tasks);
    this.subject.next(this.tasks);
    
  }
  refreshTask2(tasks: string): void {
    this.tasks = tasks;
   if(tasks === null || tasks === undefined )
   {
    this.tasks="";
    
   }
   console.log(this.tasks);
    this.subject2.next(this.tasks);
    
  }
}
