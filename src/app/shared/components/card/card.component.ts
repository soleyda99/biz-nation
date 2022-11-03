import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateComponent } from 'src/app/components/characters/pages/create/create.component';
import { EditComponent } from 'src/app/components/characters/pages/edit/edit.component';
import { img } from '../../config/img';
import { Result } from '../../models/character';
import { LocalStorageService } from '../../services/local-storage.service';
import { ServicesSharedService } from '../../services/services-shared.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @ViewChild(EditComponent, { static: true })
  editComponent!: EditComponent;

  @ViewChild(CreateComponent, { static: true })
  CreateComponent!: CreateComponent;
  @Input() data: any;
  ruta: string = '/characters/list';

  constructor(
    private _localStorage: LocalStorageService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.ruta = event.url;
      }
    });
  }

  ngOnInit(): void {}
  edit(data: Result) {
    this.editComponent.open(data);
  }

  editSave(character: any) {
    this.data.forEach((response: any) => {
      response.forEach((res: any) => {
        if (res.id === character.id) {
          res.name = character.name;
          res.description = character.description;
          res.modified = character.modified;
          res.thumbnail.extension = character.extension;
          res.thumbnail.path = character.path;
        }
      });
    });
  }

  isOnHeart(character: Result) {
    if (character.src === img.offHeart) {
      character.src = img.onHeart;
    } else {
      character.src = img.offHeart;
    }
    this._localStorage.addOrRemoveFavorite(character);
  }

  openWindow(url: Result) {
    window.open(url.urls[0].url);
  }
}
