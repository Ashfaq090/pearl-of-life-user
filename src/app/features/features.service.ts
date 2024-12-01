import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root', // Ensures the service is available globally
})
export class FeaturesService extends BaseService {
    private baseUrl = 'http://localhost:3000'; // Replace with your API URL

    getNotes(optionalParams?: any): Observable<any> {
        return this.get(`${this.baseUrl}/notes`, optionalParams);
    }
    
    getNotesByUserId(id: string = '72FB6FC5-1488-4E1F-9CFC-7992318A670C', optionalParams?: any): Observable<any> {
        return this.get(`${this.baseUrl}/notes/${id}`, optionalParams);
    }

}