import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApiService } from '../../../services/admin-api.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserPromoComponent } from '../user-promo/user-promo.component';
import { SharedService } from 'src/app/services/shared.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-user-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.scss'],
})
export class AdminUserDetailsComponent implements OnInit {
  user: any = null;
  loading: boolean = false;

  showDeceasedDateForm: boolean = false;
  dateOfDeathControl: any = new FormControl(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminApi: AdminApiService,
    private readonly ngbModalService: NgbModal,
    private readonly sharedService: SharedService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(id);
    }
  }

  loadUser(id: string) {
    this.loading = true;
    this.adminApi.getUserById(id).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
        if(this.user.date_of_death){
          const dod = new Date(this.user.date_of_death);
          this.dateOfDeathControl.setValue({ year: dod.getFullYear(), month: dod.getMonth() + 1, day: dod.getDate()-1 });
        }
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.loading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/admin/users']);
  }

  activateUser() {
    if (confirm('Activate this user?')) {
      this.adminApi.activateUser(this.user.id).subscribe({
        next: () => this.loadUser(this.user.id),
      });
    }
  }

  deactivateUser() {
    if (confirm('Deactivate this user?')) {
      this.adminApi.deactivateUser(this.user.id).subscribe({
        next: () => this.loadUser(this.user.id),
      });
    }
  }

  terminateUser() {
    if (confirm('Terminate this user account? This action cannot be undone.')) {
      this.adminApi.terminateUser(this.user.id).subscribe({
        next: () => this.loadUser(this.user.id),
      });
    }
  }

  updateDeceasedDate() {
    if(this.dateOfDeathControl.value === null){
      return;
    }
    if (confirm('Update the deceased date for this user? This action cannot be undone.')) {
      const dod: any = this.dateOfDeathControl.value;
      const nativeDate = new Date(dod.year, dod.month-1, dod.day+1);
      this.adminApi.updateDeceasedDate(this.user.id, nativeDate.toISOString()).subscribe({
        next: () => this.loadUser(this.user.id),
      });
    }
  }

  providePromo(){
    const modalRef = this.ngbModalService.open(UserPromoComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      centered: false,
    });

    modalRef.componentInstance.user = this.user;

    // Reset style attribute safely if the backdrop or escape key closes the modal
    modalRef.result.then(
      (result) => { console.log(result); this.user.promo_code = result.promo_code; },
    );    
  }

  removePromo(){
    this.adminApi.addUpdateUserPromo(this.user.id, '')
        .subscribe({
          next: (response: any) => {
            this.sharedService.showToast({
              classname: 'success',
              text: 'Promo code removed successfully',
            });
            this.user.promo_code = null; // Update local user object to reflect the change
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

