import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from "./components/button/button.component";
import { CardTaskComponent } from './components/card-task/card-task.component';
import { FormComponent } from "./components/form/form.component";
import { FilterPipe } from './pipes/filter.pipe';
import { TaskService } from './services/task.service';
import type { STATE } from './types/state.type';
import type { Task } from './types/task.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, CardTaskComponent, FormComponent, ButtonComponent, FilterPipe],
  templateUrl: './app.component.html'
})
export class AppComponent {
  list = true
  first = false
  taskService = inject(TaskService)
  filter: STATE = 'ALL'

  trackById(_: number, task: Task): string {
    return task.id;
  }

  onChangeList() {
    this.list = true
  }
}
