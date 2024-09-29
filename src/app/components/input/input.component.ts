import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html'
})
export class InputComponent implements ControlValueAccessor {
  value = ''
  @Input() type = 'text'
  @Input() valid?: boolean;
  @Input() touched?: boolean;

  onChange = (value: string) => { }
  onTouched = () => { }

  writeValue(value: string): void {
    this.value = value
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  handleInput(target: any | null): void {
    this.value = target?.value ?? ''
    this.onChange(target?.value ?? '')
    this.onTouched()
  }

}
