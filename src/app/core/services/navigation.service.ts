import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { MenuItem } from '../../layout/navigation/navigation/navigation.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _menuItems: MenuItem[] = [
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

  private mobileNavVisibleSource = new BehaviorSubject<boolean>(false);
  mobileNavVisible$ = this.mobileNavVisibleSource.asObservable();

  private activeRouteSource = new BehaviorSubject<string>('');
  activeRoute$ = this.activeRouteSource.asObservable();

  constructor(private router: Router) {
    // Subscribe to router events to track the active route
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects || event.url)
      )
      .subscribe((url) => {
        this.activeRouteSource.next(url);
      });
  }

  get menuItems(): MenuItem[] {
    return this._menuItems;
  }

  navigateTo(path: string): Promise<boolean> {
    return this.router.navigate([path]);
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

  isActive(path: string): boolean {
    return this.router.isActive(path, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  findMenuItem(label: string): MenuItem | undefined {
    return this._menuItems.find((item) => item.label === label);
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
}
