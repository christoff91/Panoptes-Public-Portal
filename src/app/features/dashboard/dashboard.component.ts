import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @Output() updateActiveLabel = new EventEmitter<string>();
  constructor(private router: Router) {}

  menuItems = [
    { label: 'Municipal', path: '/municipal', icon: 'account_balance' },
    {
      label: 'My Digital Profile',
      path: '/digital-profile',
      icon: 'contact_mail',
    },
  ];

  activeRoute: string = '';

  navigate(path: string) {
    this.router.navigate([path]);
    this.emitActiveLabel(path);
  }

  emitActiveLabel(path?: string) {
    const currentPath = path || this.activeRoute;
    const activeItem = this.menuItems.find((item) =>
      currentPath.startsWith(item.path)
    );
    this.updateActiveLabel.emit(activeItem ? activeItem.label : '');
  }
}
