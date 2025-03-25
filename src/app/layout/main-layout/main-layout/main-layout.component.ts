import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResponsiveService } from '../../../core/services/responsive.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  isMobile: boolean = false;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit() {
    this.responsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
