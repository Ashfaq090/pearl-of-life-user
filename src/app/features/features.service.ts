import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/services/base.service";

@Injectable({
    providedIn: 'root'
})
export class FeaturesService extends BaseService {
    private baseUrl = 'http://localhost:3000'; // Replace with your API URL

    getUserPlan(): Observable<any> {
        return this.get(`${this.baseUrl}/users/plan`);
    }

}