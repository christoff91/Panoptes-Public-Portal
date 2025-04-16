import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-arrangements',
  imports: [MatIconModule],
  templateUrl: './arrangements.component.html',
  styleUrl: './arrangements.component.scss',
})
export class ArrangementsComponent {
  constructor(private navigationService: NavigationService) {}

  navigate(path: string) {
    this.navigationService.navigateTo(path);
  }
}
