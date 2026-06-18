import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterKeyholderComponent } from './register-keyholder/register-keyholder.component';
import { AccessKeyholderComponent } from './access-keyholder/access-keyholder.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    RegisterKeyholderComponent,
    AccessKeyholderComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, NgbDatepickerModule],
})
export class AuthModule {}
