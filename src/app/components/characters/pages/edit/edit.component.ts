import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
declare var $: any;
import * as moment from 'moment';
import { Result } from 'src/app/shared/models/character';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @ViewChild('modalEditCharacter', { static: true })
  modalEditCharacter!: ElementRef;
  loginForm!: FormGroup;
  character: Result = {
    name: '',
    description: '',
    modified: '',
    id: 0,
    thumbnail: { extension: '', path: '' },
    urls: [{ url: '', type: '' }],
    src: '',
  };
  @ViewChild('myInput')
  myInputVariable!: ElementRef;
  @Output() saved = new EventEmitter<any>();
  error = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form();
  }

  form() {
    this.loginForm = this.formBuilder.group({
      name: new FormControl(this.character.name, [Validators.required]),
      id: new FormControl(this.character.id, [Validators.required]),
      description: new FormControl(this.character.description, [
        Validators.required,
      ]),
      modified: new FormControl(moment().format('YYYY-MM-DD'), [
        Validators.required,
      ]),
      path: new FormControl('', [Validators.required]),
      extension: new FormControl('', [Validators.required]),
    });
  }
  open(data: Result) {
    this.character = data;
    this.form();
    $(this.modalEditCharacter.nativeElement).modal('show');
  }

  url(e: any) {
    let divisiones = [];
    divisiones = e.target.value.split('.');

    let extension = [];
    extension = divisiones.splice(-1, 1);

    this.loginForm.patchValue({
      path: divisiones.join('.'),
      extension: extension[0],
    });
    this.loginForm.value.path === ''
      ? (this.error = 'Por favor ingrese una URL válida')
      : (this.error = '');
  }
  submit() {
    this.saved.emit(this.loginForm.value);
    this.myInputVariable.nativeElement.value = '';
    $(this.modalEditCharacter.nativeElement).modal('hide');
  }

  close() {
    this.error = '';
    this.myInputVariable.nativeElement.value = '';
    $(this.modalEditCharacter.nativeElement).modal('hide');
  }
}
