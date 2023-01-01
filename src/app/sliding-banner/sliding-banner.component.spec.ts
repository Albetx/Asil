import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingBannerComponent } from './sliding-banner.component';

describe('SlidingBannerComponent', () => {
  let component: SlidingBannerComponent;
  let fixture: ComponentFixture<SlidingBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidingBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidingBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
