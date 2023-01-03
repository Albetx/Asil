import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sliding-banner',
  templateUrl: './sliding-banner.component.html',
  styleUrls: ['./sliding-banner.component.css']
})
export class SlidingBannerComponent implements OnInit {

  @Input() banners!: string[]; // an array of strings representing the banners images url's
  currentBannerIndex = 0; // the index of the current banner being displayed

  constructor() { }

  ngOnInit(): void {
    // start the banner rotation
    this.startBannerRotation(); 
  }

  startBannerRotation() {
    setInterval(() => {
      // increment the current banner index and reset it to 0 if it goes out of bounds
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    }, 7000); // rotate banners every 7 seconds
  }

  // select the previous banner
  prevBanner() {
    this.currentBannerIndex = (this.currentBannerIndex - 1 + this.banners.length) % this.banners.length;
  }

  // select the next banner
  nextBanner() {
    this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
  }

  // select a specific banner by index
  selectBanner(index: number) {
    this.currentBannerIndex = index;
  }

}
