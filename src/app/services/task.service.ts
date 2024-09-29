import { Injectable, inject } from '@angular/core';
import { nanoid } from 'nanoid';
import { TaskStore } from '../store/task.store';
import type { Task } from '../types/task.type';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  #taskStore = inject(TaskStore)

  get tasks$() {
    return this.#taskStore.value$
  }

  addTask(task: Omit<Task, 'id' | 'completed'>) {
    const id = nanoid()

    task.users = task.users.map((user) => {
      const id = nanoid()
      return { ...user, id }
    })

    this.#taskStore.add({ ...task, id, completed: false })
  }

  changeStateTask(id: string) {
    this.#taskStore.completed(id)
  }
}
