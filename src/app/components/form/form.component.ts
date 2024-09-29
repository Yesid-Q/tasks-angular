import { CommonModule } from '@angular/common';
import { Component, EventEmitter, type OnInit, Output, inject } from '@angular/core';
import { type FormArray, FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TaskService } from 'src/app/services/task.service';
import { uniqueUserValidators } from 'src/app/validators/unique-user.validator';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from "../input/input.component";


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  duplicate = false
  formTask!: FormGroup
  #fb = inject(FormBuilder)
  #taskService = inject(TaskService)
  @Output() completed = new EventEmitter()

  ngOnInit(): void {
    this.formTask = this.#fb.group({
      name: this.#fb.control('', [Validators.required, Validators.minLength(3)]),
      deadline: this.#fb.control('', [Validators.required]),
      users: this.#fb.array([
        this.#fb.group({
          name: this.#fb.control('', [Validators.required, Validators.minLength(5)]),
          age: this.#fb.control(0, [Validators.required, Validators.min(18)]),
          skills: this.#fb.array([''], [Validators.minLength(1)])
        }),
      ], [uniqueUserValidators('name')])
    })
  }

  get users() {
    return this.formTask.get('users') as FormArray;
  }

  getSkills(index: number) {
    return this.users.at(index).get('skills') as FormArray
  }

  onSubmit() {
    if (this.formTask.valid) {
      this.#taskService.addTask(this.formTask.value)
      this.formTask.reset()
      this.completed.emit()
    }
  }

  addNewUser() {
    this.users.push(
      this.#fb.group({
        name: this.#fb.control('', [Validators.required, Validators.minLength(5)]),
        age: this.#fb.control(0, [Validators.required, Validators.min(18)]),
        skills: this.#fb.array([''], [Validators.minLength(1)])
      }, [uniqueUserValidators('name')])
    )
  }

  addSkill(index: number) {
    this.getSkills(index).push(this.#fb.control(''))
  }

  removeSkill(userIndex: number, skillIndex: number) {
    if (this.getSkills.length > 1)
      this.getSkills(userIndex).removeAt(skillIndex)
  }
}
