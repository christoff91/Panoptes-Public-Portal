import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-municipal',
  imports: [],
  templateUrl: './municipal.component.html',
  styleUrl: './municipal.component.scss',
})
export class MunicipalComponent {
  constructor(private navigationService: NavigationService) {}

  navigate(path: string) {
    this.navigationService.navigateTo(path);
  }
}
