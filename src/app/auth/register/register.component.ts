import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      console.log(this.registerForm.value)
      return;
    }
    const form = this.registerForm.value;
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
        this.router.navigate(['/auth/login']);
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
