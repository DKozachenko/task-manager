import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconDefinition } from '@ant-design/icons-angular';
import { EyeInvisibleOutline, EyeFill, InfoCircleFill } from '@ant-design/icons-angular/icons';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { SharedModule } from '../shared/shared.module';

const icons: IconDefinition[] = [
  EyeInvisibleOutline,
  EyeFill,
  InfoCircleFill
];

@NgModule({
  declarations: [
    LayoutComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    AuthorizationRoutingModule,
    SharedModule,
    NzTabsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule.forChild(icons),
    NzButtonModule,
    NzToolTipModule
  ]
})
export class AuthorizationModule { }
