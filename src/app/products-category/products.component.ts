import { UserService } from './../services/user.service';
import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthService } from '../Authentication/auth.service';
import { ActivatedRoute } from '@angular/router';

const TYPE_CATEGORY = "category";
const TYPE_SAVED_ITEMS = "saved-items";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  pageType = TYPE_CATEGORY;
  productsList: any;

  firstItemIndex = 0;
  lastItemIndex = 0;
  currentPage = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService) {
   }

  
  ngOnInit(): void {
    // Gets the type of the page from the link params: category, saveItems, etc..
    this.route.paramMap
      .subscribe(params => {
        this.pageType = String(params.get("type"));
      });

    if (this.pageType == TYPE_CATEGORY){
      this.productService.getAll()
      .subscribe(response => {
        this.productsList = response;
        this.lastItemIndex = Math.min(this.productsList.length, this.pageSize); // Calculates items in page
        console.log(this.productsList)});
    }

    else if (this.pageType == TYPE_SAVED_ITEMS){
      this.userService.getUserByEmail(this.authService.currentUser["sub"])
        .subscribe((result: any) => {
          this.productsList = result["savedProducts"];
          this.lastItemIndex = Math.min(this.productsList.length, this.pageSize); // Calculates items in page
          console.log(this.productsList);
        })
    }
  }

  // Updates the table on every page nav
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
