import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { ServicesService } from 'src/app/components/characters/pages/services/services.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private _servicesService: ServicesService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._servicesService.onSpinner();
    return next
      .handle(req)
      .pipe(finalize(() => this._servicesService.offSpinner()));
  }
}
