import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Observable } from 'rxjs';
import { ResponsiveService } from '../../../core/services/responsive.service';
import { NavigationComponent } from '../../navigation/navigation/navigation.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, NavigationComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isMobile: boolean = false;

  constructor(
    private responsiveService: ResponsiveService,
    private authService: AuthService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    // this.authService.isLoggedIn$.subscribe((status) => {
    //   this.isLoggedIn = status;
    // });
  }

  ngOnInit() {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
