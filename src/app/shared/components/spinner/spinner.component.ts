import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/components/characters/pages/services/services.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  isLoading = this._serviceService.isLoading;
  constructor(private _serviceService: ServicesService) {}
}
