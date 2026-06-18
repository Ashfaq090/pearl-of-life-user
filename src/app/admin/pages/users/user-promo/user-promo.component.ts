import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApiService } from 'src/app/admin/services/admin-api.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-promo',
  templateUrl: './user-promo.component.html',
  styleUrls: ['./user-promo.component.scss']
})
export class UserPromoComponent implements OnInit {
  public promoCodeForm: FormGroup;
  @Input() user: any = {};
  maxlength: number = 20;
  plans: any[] = [];
  
  constructor(
      private readonly activeModal: NgbActiveModal,
      private readonly formBuilder: UntypedFormBuilder,
      private readonly sharedService: SharedService,
      private readonly adminApi: AdminApiService,
      private readonly paymentService: PaymentService
    ){}

    ngOnInit(): void {
      this.getSubscriptionPlans();
      this.promoCodeForm = this.formBuilder.group({
        promo_code: ['',Validators.required],
        plan: ['',Validators.required]
      })
    }

    closeModal(creds?: any): void {
      this.activeModal.close(creds || null);
    }

    getSubscriptionPlans() {
      this.paymentService.getSubscriptionPlans().subscribe({
        next: (plans: any[]) => {
          this.plans = plans;
          console.log({plans})
        },
      error: () => {
        this.plans = [];
      },
      });
    }

    submit() {
      if (this.promoCodeForm.invalid) {
        return;
      }
      this.adminApi.addUpdateUserPromo(this.user.id, this.promoCodeForm.value.promo_code, this.promoCodeForm.value.plan)
        .subscribe({
          next: (response: any) => {
            this.sharedService.showToast({
              classname: 'success',
              text: response?.message,
            });
            this.closeModal({...response.data, promo_code: this.promoCodeForm.value.promo_code});
          },
          error: (err: any) => {
            this.sharedService.showToast({
              classname: 'error',
              text: err?.error?.message,
            });
          },
        });
    }

}
