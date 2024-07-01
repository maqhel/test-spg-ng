import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl<any>('');
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() icon: string = '';
}
