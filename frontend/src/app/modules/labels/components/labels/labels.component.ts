import { Component, OnInit } from '@angular/core';
import { ILabelForDashboard } from './../../../shared/models/interfaces';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.sass'],
})
export class LabelsComponent implements OnInit {
  public arr: ILabelForDashboard[] = [
    {
      name: 'name 1',
      colorHexCode: 'green',
    },
    {
      name: 'name 2',
      colorHexCode: '#fff',
    },
    {
      name: 'name 3',
      colorHexCode: '#cecece',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  public trackByFunc(index: number, label: ILabelForDashboard): string {
    return label.name;
  }
}
