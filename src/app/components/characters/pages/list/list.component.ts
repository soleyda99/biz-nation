import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { img } from 'src/app/shared/config/img';
import { Result } from 'src/app/shared/models/character';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ServicesSharedService } from 'src/app/shared/services/services-shared.service';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public data$: Observable<Result[]>;
  cantidad: number[] = [10, 20, 50, 100];
  limit: number = 10;
  constructor(
    private _services: ServicesService,
    private _serviceSharing: ServicesSharedService,
    private _localStorage: LocalStorageService,
    private _servicesService: ServicesSharedService
  ) {
    this.data$ = _servicesService.sharingObservable;
  }

  ngOnInit(): void {
    this.getCharacters(10);
  }

  getCharacters(limit: number) {
    this._services.getCharacters(limit).subscribe((res) => {
      this._serviceSharing.sharingObservableData = res;
      let character = this._localStorage.getCharacters();
      if (character.length > 0) {
        this.getCreados(character);
      }
      let fav = this._localStorage.getFavorites();
      if (fav.length > 0) {
        this.getFav(fav, res);
      }
    });
  }

  getFav(fav: [], res: Result[]) {
    fav.forEach((element: any) => {
      res.forEach((data: any) => {
        if (element.id == data.id) {
          data.src = img.onHeart;
        }
      });
    });
  }

  getCreados(character: any) {
    console.log(character, 'prueba');
    this.data$.subscribe((data) => {
      character.forEach((response: any) => {
        const even = (element: any) => element.id === response.id;
        if (!data.some(even)) {
          data.unshift(response);
        }
      });
    });
  }

  count(num: any) {
    this.limit = num.target.value;
    this.getCharacters(num.target.value);
  }
}
