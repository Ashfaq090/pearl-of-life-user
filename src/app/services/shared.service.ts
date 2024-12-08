import { inject, Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SharedService extends BaseService {

    private router = inject(Router);    
    public userToken: string | null = localStorage.getItem('accessToken');
    public toaster = new Subject<any>();

    public setUserToken(token: any): void {
        localStorage.setItem('accessToken', token);
        this.userToken = token;
    }

    public clearUserData(): void {
        localStorage.clear();
        this.userToken = null;
    }

    public logout(): void {
        this.clearUserData();
        this.router.navigate(['/auth/login']);
        this.showToast({
            classname: 'success',
            text: 'You have been successfully logged out!'
        })
    }

    public showToast(toast: any) {
        this.toaster.next(toast);
    }
    
    public hideToast() {
        this.toaster.next(false);
    }

}