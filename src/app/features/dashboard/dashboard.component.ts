import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  HostListener,
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
  progress = 50;
  currentSlide = 0;
  slides: any[] = [];
  touchStartX = 0;
  touchEndX = 0;

  constructor(private fb: FormBuilder, private router: Router) {
    this.generateRandomSlides();
  }

  get progressRotation(): number {
    return this.progress * 3.6;
  }

  generateRandomSlides(): void {
    // Generate random content for 3 slides
    const contentTypes = ['quote', 'fact', 'tip'];
    const quotes = [
      'The only way to do great work is to love what you do.',
      'Innovation distinguishes between a leader and a follower.',
      "Your time is limited, don't waste it living someone else's life.",
    ];
    const facts = [
      'The human brain has enough memory to hold 2.5 million gigabytes.',
      'Honey never spoils - archaeologists have found pots of honey in ancient Egyptian tombs.',
      'The shortest war in history was between Britain and Zanzibar in 1896 (38 minutes).',
    ];
    const tips = [
      'Drink a glass of water first thing in the morning to kickstart your metabolism.',
      'Take a 5-minute break every hour to improve productivity.',
      'Learn something new every day to keep your brain active.',
    ];

    for (let i = 0; i < 3; i++) {
      const type =
        contentTypes[Math.floor(Math.random() * contentTypes.length)];
      let content = '';

      switch (type) {
        case 'quote':
          content = quotes[Math.floor(Math.random() * quotes.length)];
          break;
        case 'fact':
          content = facts[Math.floor(Math.random() * facts.length)];
          break;
        case 'tip':
          content = tips[Math.floor(Math.random() * tips.length)];
          break;
      }

      this.slides.push({
        type,
        content,
        showProgress: i === 0, // Only show progress on first slide
      });
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  // Touch event handlers for swipe detection
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const minSwipeDistance = 50; // Minimum distance to consider it a swipe
    const difference = this.touchStartX - this.touchEndX;

    if (Math.abs(difference) < minSwipeDistance) return;

    if (difference > 0) {
      // Swipe left - next slide
      this.nextSlide();
    } else {
      // Swipe right - previous slide
      this.prevSlide();
    }
  }
}
