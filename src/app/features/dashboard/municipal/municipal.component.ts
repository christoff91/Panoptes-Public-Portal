import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationLabelService } from '../../../core/services/navigation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipal',
  imports: [],
  templateUrl: './municipal.component.html',
  styleUrl: './municipal.component.scss',
})
export class MunicipalComponent implements OnInit, OnDestroy {
  activeLabel: string = '';
  private labelSubscription: Subscription | null = null;

  constructor(
    private navigationLabelService: NavigationLabelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.labelSubscription = this.navigationLabelService.activeLabel$.subscribe(
      (label: string) => {
        this.activeLabel = label;
        console.log('Current active label:', this.activeLabel);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.labelSubscription) {
      this.labelSubscription.unsubscribe();
    }
  }

  navigateWithLabel(path: string) {
    this.router.navigate([path]);
  }
}
