import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent (tasks)', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        OverlayModule,
        HttpClientModule,
      ],
      providers: [
        NzModalService,
        NzNotificationService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has no initial data', () => {
    expect(component.dataForDashboard.length).toBe(0);
  });

  it('should set loading to true when reload', () => {
    component.reload();
    expect(component.isLoading).toBeTruthy();
  });

  it('should has trackBy function', () => {
    expect(component.trackByFunc).toBeTruthy();
  });
});
