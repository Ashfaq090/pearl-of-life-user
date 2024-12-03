import { inject, Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class SharedService extends BaseService {

    private router = inject(Router);    
    public userToken: string | null = localStorage.getItem('accessToken');

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
    }

}