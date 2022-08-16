import { Component, Input } from '@angular/core';
import { ILabelForDashboard } from '../../../shared/models/interfaces';

@Component({
  selector: 'labels-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.sass']
})
export class LabelComponent {
  @Input() public label: ILabelForDashboard = {
    name: '',
    colorHexCode: ''
  };
}
