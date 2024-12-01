import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root',
})
export class SharedService extends BaseService {
    public userToken: string | null = localStorage.getItem('accessToken');

    public setUserToken(token: any): void {
        localStorage.setItem('accessToken', token);
        this.userToken = token;
    }

    public clearUserData(): void {
        localStorage.clear();
    }
}