import { ProductService } from './../services/product.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AppError } from '../common/app-error';
import { NotFoundError } from 'rxjs';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent{
  @Input ('id') id = 0;
  @Input('isLiked') isLiked = false;
  @Input('likesCount') likesCount = 0;
  position = "off"

  constructor(private service: ProductService){}
  
  // ngOnChanges(changes: SimpleChanges){
  //   if (changes[this.id].currentValue != 0){
  //     this.service.getById(this.id)
  //     .subscribe(response => {
  //       this.likesCount = (response as any).likes;
  //     })
  //   }
  // }

  onClick (){
    let oldLikes = this.likesCount;

    this.likesCount += (this.isLiked) ? -1 : 1;
    this.isLiked = !this.isLiked;

    this.service.update({
      "id": this.id,
      "likes": this.likesCount
    })
      .subscribe({next: response => {
      },
        error:(error: AppError) => {
        this.likesCount = oldLikes;
        if (error instanceof NotFoundError)
          alert("Bad product id.");
        else throw error;}
  })
  }

}
