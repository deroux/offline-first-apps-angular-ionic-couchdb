import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../services/todo.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  todos: String[] = [];
  todos$: Observable<Object>; 
  constructor(private todoService: TodoService, private http: HttpClient) {
    this.todos$ = this.http.get('/api/todos');
    this.todos = this.todoService.getTodos()
  }

  addTodo(todo: string){
    this.todos.push(todo);
  }
}
