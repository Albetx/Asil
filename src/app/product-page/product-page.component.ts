import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotFoundError } from 'rxjs';
import { AppError } from '../common/app-error';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  id!: number;
  product: any;
  likes = 0;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService
  ) { }

  ngOnInit(): void {

    this.route.paramMap
      .subscribe(params => {
        this.id = Number(params.get('id'));
        this.service.getById(this.id)
          .subscribe(response => {
            this.product = response;
            this.likes = this.product.likes;
          })
      })
  }

  get title(){
    if (!this.product)
      return ""
    return this.product.name;
  }

  get img(){
    if (!this.product)
      return ""
    return this.product.img;
  }

  get content(){
    if (!this.product)
      return ""
    return this.product.content;
  }

  get cupon(){
    if (!this.product)
      return ""
    return this.product.cupon;
  }

  get link(){
    if (!this.product)
      return ""
    return this.product.link;
  }

}
