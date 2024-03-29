import { AuthorizationService } from 'src/app/modules/authorization/store';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestService } from 'src/app/modules/shared/services';

import { LoginFormComponent } from './login-form.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OverlayModule } from '@angular/cdk/overlay';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [
        HttpClientModule,
        OverlayModule
      ],
      providers: [
        RestService,
        AuthorizationService,
        NzNotificationService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set visible to false', () => {
    expect(component.passwordVisible).toBeFalsy();
  });

  it('should disable form and button after login clicked', () => {
    component.login();
    expect(component.form.disabled).toBeTruthy();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });
});
