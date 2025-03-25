import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../../../core/services/responsive.service';

// Material Imports
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-navigation',
  imports: [
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
  isMobile: boolean = false;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit() {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
