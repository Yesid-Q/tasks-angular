import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ButtonComponent } from "./components/button/button.component";
import { CardTaskComponent } from './components/card-task/card-task.component';
import { FormComponent } from "./components/form/form.component";
import { TaskService } from './services/task.service';
import type { Task } from './types/task.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgFor, CardTaskComponent, FormComponent, ButtonComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  list = true
  first = false
  taskService = inject(TaskService)

  trackById(_: number, task: Task): string {
    return task.id;
  }

  onChangeList() {
    this.list = true
  }
}
