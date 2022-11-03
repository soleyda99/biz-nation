import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ListComponent } from 'src/app/components/characters/pages/list/list.component';
import { ServicesService } from 'src/app/components/characters/pages/services/services.service';
import { img } from '../../config/img';
import { LocalStorageService } from '../../services/local-storage.service';
import { ServicesSharedService } from '../../services/services-shared.service';
declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  search: string = '';
  @ViewChild(ListComponent, { static: true }) listComponent!: ListComponent;
  @Input() limit: number = 10;

  constructor(
    private _serviceShared: ServicesSharedService,
    private _localStorage: LocalStorageService,
    private _services: ServicesService
  ) {}

  ngOnInit(): void {}
  buscar() {
    this._serviceShared.search(this.search, this.limit).subscribe((res) => {
      this._serviceShared.sharingObservableData = res;
    });
  }

  cancel() {
    if (this.search === '') {
      this._services.getCharacters(10).subscribe((res) => {
        this._serviceShared.sharingObservableData = res;
        let fav = this._localStorage.getFavorites();
        if (fav.length > 0) {
          fav.forEach((element: any) => {
            res.forEach((data: any) => {
              if (element.id === data.id) {
                data.src = img.onHeart;
              }
            });
          });
        }
      });
    }
  }
}
