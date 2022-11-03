import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Result, Welcome } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class ServicesSharedService {
  private sharingObservablePrivate: BehaviorSubject<Result[]> =
    new BehaviorSubject([
      {
        name: '',
        description: '',
        thumbnail: { extension: '', path: '' },
        modified: '',
        urls: [{ url: '', type: '' }],
        src: '',
      },
    ]);

  constructor(private http: HttpClient) {}

  search(name: string, limit: number): Observable<Result[]> {
    return this.http
      .get<Welcome>(
        `${environment.apiUrl}?ts=${environment.ts}&apikey=${
          environment.apiKey
        }&limit=${100}&hash=${environment.hash}&nameStartsWith=` + name
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

  get sharingObservable() {
    return this.sharingObservablePrivate.asObservable();
  }
  set sharingObservableData(data: Result[]) {
    this.sharingObservablePrivate.next(data);
  }
}
