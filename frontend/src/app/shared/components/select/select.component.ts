import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl<any>('');
  @Input() required: boolean = false;
  @Input() multiple: boolean = false;
  @Input() options: any[] = [];
  @Input() keys: any[] = [];
}
