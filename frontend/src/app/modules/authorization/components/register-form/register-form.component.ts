import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'authorization-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent {
  public form: FormGroup = new FormGroup({
    fullName: new FormControl(null, [Validators.required]),
    mail: new FormControl(null, [Validators.required]),
    nickname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  public submit() {
    console.log(this.form);
  }

}
