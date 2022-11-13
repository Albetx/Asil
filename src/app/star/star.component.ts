import { Component, Input } from '@angular/core';

@Component({
  selector: 'star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent {
  @Input() isFavorite = false;
  title = "start";

  onClick(){
    this.isFavorite = !this.isFavorite;
  }

}
