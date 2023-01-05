import { catchError, Observable, of, throwError } from 'rxjs';
import { UserService } from './../services/user.service';
import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AuthService } from '../Authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BadInput } from '../common/bad-input';

const SAVE_ITEMS_URL = "/items/saved-items";
const TYPE_CATEGORY = "category";
const TYPE_SAVED_ITEMS = "saved-items";
const TYPE_SEARCH = "search-items";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  pageType = TYPE_CATEGORY;
  productsList: any;
  pageName = "";
  searchVal = "";

  firstItemIndex = 0;
  lastItemIndex = 0;
  currentPage = 0;

  constructor(
    private router: Router,
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
        if (this.pageType == TYPE_SEARCH){
          this.searchVal = String(params.get("val"))
          this.productService.getProductsBySearchString(this.searchVal)
          .pipe(
            catchError ((err: BadInput) => of())
          )
          .subscribe(response => {
            console.log(response);
            this.productsList = response;
            this.calcLastItemIndex(); // Calculates items in page
            this.pageName = "Search results"
          });
        }

        else if (this.pageType == TYPE_CATEGORY){
          this.pageName = String(params.get("categoryname"));
          this.productService.getProductsByCategory(this.pageName)
          .subscribe(response => {
            this.productsList = response;
            this.calcLastItemIndex(); // Calculates items in page
          });
        }
    
        else if (this.pageType == TYPE_SAVED_ITEMS){
          let user = this.authService.currentUser;
    
          if (user){
            this.userService.getUserByEmail(user["sub"])
            .subscribe((result: any) => {
              this.productsList = result["savedProducts"];
              this.calcLastItemIndex(); // Calculates items in page
              this.pageName = "Saved Items";
            })
          }
          // User is a guest
          else {
            this.router.navigate(['/login'], {queryParams: {returnUrl: SAVE_ITEMS_URL}});
          }
    
        }
      });


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

  calcLastItemIndex(){
    this.lastItemIndex = Math.min(this.productsList.length, this.pageSize); // Calculates items in page
  }
}
