import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Result, Welcome } from 'src/app/shared/models/character';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  isLoading = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getCharacters(limit: number): Observable<Result[]> {
    return this.http
      .get<Welcome>(
        `${environment.apiUrl}?ts=${environment.ts}&apikey=${environment.apiKey}&hash=${environment.hash}&limit=` +
          limit
      )
      .pipe(
        map((res: any) => {
          res.data.results.map((element: any) => {
            element.src = 'assets/iconmonstr-favorite-2.svg';
          });
          return res.data.results;
        })
      );
  }

  onSpinner(): void {
    this.isLoading.next(true);
  }

  offSpinner(): void {
    this.isLoading.next(false);
  }
}
