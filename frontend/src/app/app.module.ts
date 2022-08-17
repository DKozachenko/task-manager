/* eslint-disable camelcase */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ColorPickerService } from 'ngx-color-picker';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzGridModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'This field is required',
          minlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
          maxlength: ({ requiredLength, actualLength }) =>
            `Expect ${requiredLength} but got ${actualLength}`,
        },
      },
    }),
    OverlayModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    NzNotificationService,
    { provide: NZ_I18N, useValue: en_US },
    NzModalService,
    ColorPickerService
  ],
})
export class AppModule {}
