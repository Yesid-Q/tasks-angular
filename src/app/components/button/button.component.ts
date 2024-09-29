import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() type: 'submit' | 'reset' | 'button' = 'button'
  @Input() color: 'primary' | 'secondary' = 'primary'
  @Output() click = new EventEmitter()
}
