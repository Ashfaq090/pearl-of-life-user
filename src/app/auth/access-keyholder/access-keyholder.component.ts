import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-keyholder',
  templateUrl: './access-keyholder.component.html',
  styleUrls: ['./access-keyholder.component.scss']
})
export class AccessKeyholderComponent implements OnInit {

  public accessKeyholderForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private readonly sharedService: SharedService,
    private readonly authService: AuthService,
        private readonly router: Router
  ) { }

  ngOnInit() {
    this.accessKeyholderForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateOfDeath: ['', [Validators.required]],
      ssn: ['', [Validators.required]]
    });
  }

  submit(){
    if(this.accessKeyholderForm.invalid){
      this.sharedService.showToast({
        classname: 'error',
        text: 'Invalid form details!',
      });
      return;
    }
    const form = this.accessKeyholderForm.value;
    const nativeDate = new Date(form.dateOfDeath.year, form.dateOfDeath.month - 1, form.dateOfDeath.day+1);
    this.authService
          .loginKeyHolderAccess({
            first_name: form.firstName,
            last_name: form.lastName,
            date_of_death: nativeDate.toISOString(),
            ssn: form.ssn,
          })
          .pipe(
            tap((response) => {
              // Authorization
              const token = response.headers.get('Authorization');
              this.sharedService.setUserToken(token);
            })
          )
          .subscribe({
            next: (response) => {
              this.sharedService.showToast({
                classname: 'success',
                text: 'Login successful!',
              });
              this.router.navigate(['/dashboard']);
            },
            error: (err) => {
              this.sharedService.showToast({
                classname: 'error',
                text: err?.error?.message,
              });
            },
          });
  }

}
