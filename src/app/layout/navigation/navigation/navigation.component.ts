import { Component, signal, OnInit, Output, EventEmitter } from '@angular/core';

// Material Imports
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [
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
  isMobile = signal<boolean>(false);

  activeRoute: string = '';

  menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    {
      label: 'My Digital Profile',
      path: '/digital-profile',
      icon: 'contact_mail',
    },
    { label: 'Accounts', path: '/accounts', icon: 'account_balance_wallet' },
    { label: 'Arrangements', path: '/arrangements', icon: 'credit_score' },
    { label: 'Indigent', path: '/indigents', icon: 'home_work' },
  ];

  constructor(
    private responsiveService: ResponsiveService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit(): void {
    this.responsiveService.isMobile().subscribe((mobile) => {
      this.isMobile.set(mobile);
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.emitActiveLabel(path);
    if (this.isMobile()) {
      this.closeNavBar.emit(); // Close sidebar on mobile
    }
  }

  emitActiveLabel(path?: string) {
    const currentPath = path || this.activeRoute;
    const activeItem = this.menuItems.find((item) =>
      currentPath.startsWith(item.path)
    );
    this.updateActiveLabel.emit(activeItem ? activeItem.label : ''); // ✅ Emit label
  }

  isActive(path: string): boolean {
    return this.activeRoute.startsWith(path); // Ensures active state for subroutes
  }

  onCloseClicked() {
    this.closeNavBar.emit();
    console.log('Closing the navbar');
  }
}
