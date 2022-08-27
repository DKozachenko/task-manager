import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [
        OverlayModule,
        HttpClientModule
      ],
      providers: [
        NzModalService,
        NzNotificationService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has task', () => {
    expect(component.task).toBeTruthy();
    expect(Object.keys(component.task).length).toBeGreaterThan(0);
  });

  it('should has edit method', () => {
    expect(component.edit).toBeTruthy();
  });

  it('should has delete method', () => {
    expect(component.delete).toBeTruthy();
  });
});
