import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbnComponent } from './tbn.component';

describe('TbnComponent', () => {
  let component: TbnComponent;
  let fixture: ComponentFixture<TbnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TbnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TbnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
