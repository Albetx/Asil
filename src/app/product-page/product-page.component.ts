import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  id!: number;
  product: any;
  likes = 0;
  content = "";

  constructor(
    private clipboard: Clipboard,
    private http: HttpClient,
    private route: ActivatedRoute,
    private service: ProductService
  ) { }

  ngOnInit(): void {

    this.route.paramMap
      .subscribe(params => {
        this.id = Number(params.get('id'));
        this.service.getProductById(this.id)
          .subscribe(response => {
            this.product = response;
            this.likes = this.product.likes;

            this.http.get(this.product.content, {responseType: 'text'})
            .subscribe(data => {
              this.content = data;
          })
          })
      })
  }

  redirectToSite() {
    window.location.href = this.product.link;
  }

  copyCoupon(){
    this.clipboard.copy(this.coupon);
    window.alert("Coupon copied to clipboard!")
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

  get coupon(){
    if (!this.product)
      return ""
    return this.product.coupon;
  }

  get link(){
    if (!this.product)
      return ""
    return this.product.link;
  }

}
