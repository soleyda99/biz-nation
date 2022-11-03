import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Result } from '../models/character';

const MY_FAVORITES: string = 'myFavorites';
const CREATE: string = 'create';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<Result[]>([]);
  characterFav$ = this.charactersFavSubject.asObservable();
  private charactersSubject = new BehaviorSubject<Result[]>([]);

  constructor() {
    this.initialStorage();
  }

  addOrRemoveFavorite(character: any): void {
    const { id } = character;
    const currentsFav = this.getFavorites();
    const found = !!currentsFav.find((fav: Result) => fav.id == id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  createCharacter(character: Result): void {
    try {
      const currentsFav = this.getCharacters();
      localStorage.setItem(CREATE, JSON.stringify([...currentsFav, character]));
      this.charactersFavSubject.next([...currentsFav, character]);
    } catch (error) {
      console.log('Error saving localStorage', error);
    }
  }

  private addToFavorite(character: Result): void {
    try {
      const currentsFav = this.getFavorites();
      localStorage.setItem(
        MY_FAVORITES,
        JSON.stringify([...currentsFav, character])
      );
      this.charactersFavSubject.next([...currentsFav, character]);
    } catch (error) {
      console.log('Error saving localStorage', error);
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavorites();
      const characters = currentsFav.filter((item: any) => item.id != id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      this.charactersFavSubject.next([...characters]);
    } catch (error) {
      console.log('Error removing localStorage', error);
    }
  }

  getFavorites() {
    try {
      const characterFav = JSON.parse(`${localStorage.getItem(MY_FAVORITES)}`);
      this.charactersFavSubject.next(characterFav);
      return characterFav;
    } catch (error) {
      console.log('Error getting favorites from localStorage', error);
    }
  }

  getCharacters() {
    try {
      const character = JSON.parse(`${localStorage.getItem(CREATE)}`);
      this.charactersSubject.next(character);
      return character;
    } catch (error) {
      console.log('Error saving localStorage', error);
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(`${localStorage.getItem(MY_FAVORITES)}`);
    const currentsCreate = JSON.parse(`${localStorage.getItem(CREATE)}`);

    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }

    if (!currentsCreate) {
      localStorage.setItem(CREATE, JSON.stringify([]));
    }
    this.getFavorites();
  }
}
