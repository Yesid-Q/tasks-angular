import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';

import { TaskService } from 'src/app/services/task.service';
import type { Task } from 'src/app/types/task.type';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.css']
})
export class CardTaskComponent {

  @Input() task!: Task

  #taskService = inject(TaskService)

  changeState() {
    this.#taskService.changeStateTask(this.task.id)
  }
}
