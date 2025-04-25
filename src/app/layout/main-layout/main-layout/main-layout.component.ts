import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  signal,
} from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { filter, Observable } from 'rxjs';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { NavigationComponent } from '../../navigation/navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    FooterComponent,
    RouterModule,
    MatSidenavModule,
    NavigationComponent,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = signal<boolean>(false);
  activeLabel = signal<string>('');
  hideNavigation = signal<boolean>(false);

  // Routes where the navigation should be hidden
  private readonly hiddenNavRoutes = [
    '/login',
    '/auth/login',
    '/sign-up',
    '/auth/sign-up',
    '/forgot-password',
    '/auth/forgot-password',
  ];

  constructor(
    private responsiveService: ResponsiveService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.responsiveService.isMobile().subscribe((mobile) => {
      this.isMobile.set(mobile);
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.hideNavigation.set(
          this.shouldHideNavigation(event.urlAfterRedirects)
        );
        this.updateActiveLabel(event.urlAfterRedirects);
      });

    const currentUrl = this.router.url;
    this.hideNavigation.set(this.shouldHideNavigation(currentUrl));
  }

  ngAfterViewInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobile() && this.sidenav?.opened) {
          this.sidenav.close();
        }
      });
  }

  updateActiveLabel(path: string) {
    const menuMap: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/municipal': 'Municipal',
      '/digital-profile': 'My Digital Profile',
      '/accounts': 'Accounts',
      '/arrangements': 'Arrangements',
      '/indigents': 'Indigent',
      '/create-arrangement': 'Create Arrangement',
      '/manage-arrangement': 'Manage Arrangement',
      '/history-arrangement': 'History',
    };

    this.activeLabel.set(menuMap[path] || '');
  }

  shouldHideNavigation(path: string): boolean {
    return this.hiddenNavRoutes.some(
      (route) => path === route || path.startsWith(`${route}/`)
    );
  }

  shouldShowSidenav(): boolean {
    return !this.hideNavigation();
  }
}
