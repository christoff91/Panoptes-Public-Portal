import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private mobileNavVisibleSource = new BehaviorSubject<boolean>(false);
  mobileNavVisible$ = this.mobileNavVisibleSource.asObservable();

  private activeRouteSource = new BehaviorSubject<string>('');
  activeRoute$ = this.activeRouteSource.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRouteSource.next(event.urlAfterRedirects);
        // Automatically close mobile nav when route changes
        this.closeMobileNav();
      });
  }

  toggleMobileNav(isVisible?: boolean) {
    if (isVisible !== undefined) {
      this.mobileNavVisibleSource.next(isVisible);
    } else {
      this.mobileNavVisibleSource.next(!this.mobileNavVisibleSource.value);
    }
  }

  closeMobileNav() {
    this.mobileNavVisibleSource.next(false);
  }

  isRouteActive(route: string): Observable<boolean> {
    return this.activeRoute$.pipe(
      map((activeRoute) => {
        if (route === activeRoute) return true;

        // Check if the current route starts with the given route path
        if (route !== '/' && activeRoute.startsWith(route)) return true;

        return false;
      })
    );
  }

  navigateTo(route: string) {
    this.closeMobileNav();
    this.router.navigate([route]);
  }
}
