import { Component } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  imports: [],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss',
})
export class ComingSoonComponent {
  launchDate: Date = new Date('2025-04-23T00:00:00');

  ngOnInit(): void {
    this.updateCountdown();
    setInterval(() => this.updateCountdown(), 1000);
  }

  updateCountdown(): void {
    const now = new Date().getTime();
    const distance = this.launchDate.getTime() - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.updateDisplay('days', days.toString().padStart(2, '0'));
    this.updateDisplay('hours', hours.toString().padStart(2, '0'));
    this.updateDisplay('minutes', minutes.toString().padStart(2, '0'));
    this.updateDisplay('seconds', seconds.toString().padStart(2, '0'));
  }

  private updateDisplay(id: string, value: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.innerHTML = value;
    }
  }
}
