import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { SharedService } from "./shared.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(
        private readonly sharedService: SharedService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.sharedService.userToken;

        req = req.clone({
            setHeaders: {
                ...(token && { Authorization: `Bearer ${token}` })
            }
        });

        return next.handle(req);
        
    }

}