import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productsList: any;

  firstItemIndex = 0;
  lastItemIndex = 0;
  currentPage = 0;

  constructor(private service: ProductService) {
    
   }

  
  ngOnInit(): void {
    this.service.getAll()
      .subscribe(response => {
        this.productsList = response;
        this.lastItemIndex = Math.min(this.productsList.length, this.pageSize);
        console.log(this.productsList)});

  }

  updateTableResults (event: any){
    this.currentPage = event.pageIndex;
    this.firstItemIndex = (this.currentPage) * this.pageSize;
    this.lastItemIndex = Math.min(this.productsList.length, this.currentPage * this.pageSize + this.pageSize);
  }

  get curProductList (){
    if (this.lastItemIndex == 0)
      return [];
    return this.productsList.slice(this.firstItemIndex, this.lastItemIndex);
  }

  get pageSize() {
    return 10;
  };

  get productsCount() {
    if (!this.productsList)
      return 0;
    return this.productsList.length;
  }

}
