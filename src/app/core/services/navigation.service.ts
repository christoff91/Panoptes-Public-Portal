import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationLabelService {
  private labelSubject = new BehaviorSubject<string>('');
  activeLabel$ = this.labelSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const label = this.getActiveRouteLabel();
        this.labelSubject.next(label || '');
      });
  }

  private getActiveRouteLabel(): string | null {
    let route: ActivatedRoute | null = this.activatedRoute.root;
    let label: string | null = null;

    while (route) {
      const childrenRoutes: ActivatedRoute[] = route.children;
      route = childrenRoutes.length
        ? childrenRoutes[childrenRoutes.length - 1]
        : null;

      if (route && route.snapshot.data && route.snapshot.data['label']) {
        label = route.snapshot.data['label'];
      }
    }

    return label;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
