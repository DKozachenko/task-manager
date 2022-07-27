import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'authorization-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent {
  public form: FormGroup = new FormGroup({
    nickname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  public passwordVisible: boolean = false;

  public submit() {
    console.log(this.form);
  }

}
