import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { EditModule } from '../components/characters/pages/edit/edit.module';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    NavbarComponent,
    CardComponent,
    SearchComponent,
    SpinnerComponent,
  ],
  exports: [NavbarComponent, CardComponent, SpinnerComponent],
  imports: [CommonModule, FormsModule, EditModule, RouterModule],
})
export class SharedModule {}
