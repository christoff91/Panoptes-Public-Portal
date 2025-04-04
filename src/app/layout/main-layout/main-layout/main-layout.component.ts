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

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterModule,
    MatSidenavModule,
    NavigationComponent,
    MatToolbarModule,
    MatIconModule,
    MatSidenav,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = signal<boolean>(false);
  activeLabel = signal<string>('');

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
        this.updateActiveLabel(event.urlAfterRedirects);
      });
  }

  ngAfterViewInit() {
    // Close sidenav on route change if in mobile mode
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobile() && this.sidenav.opened) {
          this.sidenav.close();
        }
      });
  }

  updateActiveLabel(path: string) {
    // ✅ Lookup menu label based on path (data-driven)
    const menuMap: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/digital-profile': 'My Digital Profile',
      '/accounts': 'Accounts',
      '/arrangements': 'Arrangements',
      '/indigents': 'Indigent',
    };
    console.log(`Active Label ${path}`);

    this.activeLabel.set(menuMap[path] || '');
  }
}
