import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  public forgetPasswordForm: FormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly sharedService: SharedService
  ){}

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  submit(){
    if(this.forgetPasswordForm.invalid){
      console.log(this.forgetPasswordForm.value)
      return;
    }
    const form = this.forgetPasswordForm.value;
    console.log(form);
    this.authService.register({
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      hashed_password: form.password
    }).subscribe({
      next: (response) => {
        this.sharedService.showToast({
          classname: 'success',
          text: response?.message,
        });
      },
      error: (err) => {
        this.sharedService.showToast({
          classname: 'error',
          text: err?.error?.message,
        });
      }
    });
  }

}
