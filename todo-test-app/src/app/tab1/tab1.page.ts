import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  todos: String[] = ['Do work', 'Clean room']

  constructor() {}

  onAddTodo(todo: String) {
    this.todos.push(todo);
  }
}
