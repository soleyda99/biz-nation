import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateModule } from './pages/create/create.module';
import { EditModule } from './pages/edit/edit.module';
import { FavoritesComponent } from './pages/favorites/favorites.component';

@NgModule({
  declarations: [ListComponent, FavoritesComponent],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    HttpClientModule,
    SharedModule,
    CreateModule,
    EditModule,
  ],
})
export class CharactersModule {}
