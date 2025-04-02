import { Component, ViewChild, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { NavigationComponent } from '../../navigation/navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-layout',
  imports: [
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
  @ViewChild(MatSidenavModule) sidenav!: MatSidenavModule;
  isMobile: any = signal(false); // Signal for screen size detection

  constructor(
    private responsiveService: ResponsiveService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('Something happening in MainLayout.js?');
    this.responsiveService.isMobile().subscribe((mobile) => {
      this.isMobile.set(mobile);
    });
  }

  toggleSidenav() {
    console.log('Tickle me fancy');
  }
}
