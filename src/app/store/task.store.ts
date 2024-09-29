import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import type { Task } from '../types/task.type';

const tasks = JSON.parse(localStorage.getItem('TASKS') ?? '[]')

@Injectable({ providedIn: 'root' })
export class TaskStore {
    #tasks = new BehaviorSubject<Array<Task>>(tasks)

    get value() {
        return this.#tasks.value;
    }

    get value$() {
        return this.#tasks.asObservable()
    }

    add(task: Task) {
        const tasks = this.#tasks.value
        const newTasks = [...tasks, task]
        this.#tasks.next(newTasks)
        localStorage.setItem('TASKS', JSON.stringify(newTasks))
    }

    completed(id: string) {
        const tasks = this.#tasks.value.map((task) => ({ ...task, completed: task.id === id ? !task.completed : task.completed }))
        this.#tasks.next([...tasks])
        localStorage.setItem('TASKS', JSON.stringify(tasks))
    }
}
