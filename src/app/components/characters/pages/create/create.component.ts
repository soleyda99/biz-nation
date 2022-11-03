import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, take } from 'rxjs';
import { img } from 'src/app/shared/config/img';
import { Result } from 'src/app/shared/models/character';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ServicesSharedService } from 'src/app/shared/services/services-shared.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  createForm!: FormGroup;
  errorUrl = '';
  errorName = '';

  public data$: Observable<Result[]>;
  isTrue: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _serviceShared: ServicesSharedService,
    private router: Router,
    private _localStorage: LocalStorageService
  ) {
    this.data$ = _serviceShared.sharingObservable;
  }

  ngOnInit(): void {
    this.form();
  }

  form() {
    this.createForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      modified: new FormControl(moment().format('YYYY-MM-DD'), [
        Validators.required,
      ]),
      path: new FormControl('', [Validators.required]),
      extension: new FormControl('', [Validators.required]),
    });
  }
  url(e: any) {
    let divisiones = [];
    divisiones = e.target.value.split('.');

    let extension = [];
    extension = divisiones.splice(-1, 1);

    this.createForm.patchValue({
      path: divisiones.join('.'),
      extension: extension[0],
    });
    this.createForm.value.path === ''
      ? (this.errorUrl = 'Por favor ingrese una URL válida')
      : (this.errorUrl = '');
  }
  submit() {
    this.data$.subscribe((response: any) => {
      response.push({
        id: this.createForm.value.name,
        name: this.createForm.value.name,
        description: this.createForm.value.description,
        modified: this.createForm.value.modified,
        thumbnail: {
          extension: this.createForm.value.extension,
          path: this.createForm.value.path,
        },
        src: img.offHeart,
      });
      response.unshift(response.pop());
    });
    let res: any;
    res = this.data$;
    this._localStorage.createCharacter(res.source._value[0]);
    this.router.navigate(['/characters/list']);
  }

  validar() {
    const even = (element: any) => element.name === this.createForm.value.name;
    this.data$.forEach((response) => {
      this.isTrue = response.some(even);
    });
    this.isTrue
      ? (this.errorName = 'Ya existe un personaje con ese nombre')
      : this.submit();
  }
}
