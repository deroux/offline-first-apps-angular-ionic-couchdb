import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos = [];
  constructor(private alertController: AlertController) {}

  getTodos() {
    return this.todos;
  }

  addTodo(todo: string) {
    this.todos.push(todo);
    this.presentAlert(`A new Todo ${todo} has been added`);
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Job Added',
      message: msg,
    });

    await alert.present();
  }
}