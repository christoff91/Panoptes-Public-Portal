import {
  Component,
  signal,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// Material Imports
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { NavigationService } from '../../../core/services/navigation.service';
import { MenuItem } from './navigation.model';

@Component({
  selector: 'app-navigation',
  imports: [
    CommonModule,
    RouterModule,
    MatDivider,
    MatToolbarModule,
    MatIcon,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Output() closeNavBar = new EventEmitter<void>();
  @Output() updateActiveLabel = new EventEmitter<string>();

  @Input() route: string = '';
  @Input() label: string = '';

  isActive$!: Observable<boolean>;

  isMobile = signal<boolean>(false);

  constructor(
    public navigationService: NavigationService,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.responsiveService.isMobile().subscribe((mobile) => {
      this.isMobile.set(mobile);
    });
  }

  get menuItems(): MenuItem[] {
    return this.navigationService.menuItems;
  }

  navigate(path: string): void {
    this.navigationService.navigateTo(path);
  }

  isActive(path: string): boolean {
    return this.navigationService.isActive(path);
  }

  onCloseClicked() {
    this.closeNavBar.emit();
    console.log('Closing the navbar');
  }
}
