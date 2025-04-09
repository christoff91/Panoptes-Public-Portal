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

  activeRoute: string = '';

  menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Municipal', path: '/municipal', icon: 'account_balance' },
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
    public navService: NavigationService,
    private responsiveService: ResponsiveService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute = event.urlAfterRedirects;
        // Get label from route data
        const label = this.getActiveRouteLabel();
        if (label) {
          this.updateActiveLabel.emit(label);
        } else {
          // Fall back to path matching if no route data is available
          this.emitActiveLabel();
        }
      });
    this.responsiveService.isMobile().subscribe((mobile) => {
      this.isMobile.set(mobile);
    });
  }

  private getActiveRouteLabel(): string | null {
    // Navigate to the deepest activated route
    let route: ActivatedRoute | null = this.activatedRoute.root;
    let label: string | null = null;

    // We'll collect labels as we traverse the route tree
    while (route) {
      // Get the last child if there are children
      const childrenRoutes: ActivatedRoute[] = route.children;
      route = childrenRoutes.length
        ? childrenRoutes[childrenRoutes.length - 1]
        : null;

      // If the current route has a label in its data, update our label
      if (route && route.snapshot.data && route.snapshot.data['label']) {
        label = route.snapshot.data['label'];
      }
    }

    return label;
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
    this.updateActiveLabel.emit(activeItem ? activeItem.label : '');
  }

  isActive(path: string): boolean {
    return this.activeRoute.startsWith(path); // Ensures active state for subroutes
  }

  onCloseClicked() {
    this.closeNavBar.emit();
    console.log('Closing the navbar');
  }
}
