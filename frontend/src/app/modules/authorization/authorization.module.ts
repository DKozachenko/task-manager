import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { EyeInvisibleOutline, EyeFill, InfoCircleFill } from '@ant-design/icons-angular/icons';
import { LoginFormComponent, RegisterFormComponent } from './components';
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
    NzIconModule.forChild(icons),
    SharedModule,
  ],
})
export class AuthorizationModule {}
