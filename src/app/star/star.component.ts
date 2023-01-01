import { AuthService } from './../Authentication/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'saved-item',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent implements OnInit {
  @Input('productId') productId = 0;
  product: any;
  user:string = "Guest";
  email:string = "";
  userData:any;
  isFav = false;
  favCount = 0;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private userService: UserService){}


  ngOnInit(): void {

    if (this.user = this.authService.currentUser){
      this.email = this.authService.currentUser.sub;

      this.productService.getProductById(this.productId)
        .subscribe(response => {
          this.product = response;
          this.userService.getUserByEmail(this.email)
            .subscribe((response:any) => {

              // Tests if the current item already inside the users saved products and updates the save icon.
              let alreadySaved = false;
              for (let i=0; i<response["savedProducts"].length; i++){
                if (response["savedProducts"][i]["id"] == this.product["id"]){
                  alreadySaved = true;
                }
              }
              if (alreadySaved){
                this.isFav = true;
              }
            })
        })
    }

    
  }


  onClick(){
    this.isFav = !this.isFav;
    console.log(this.user);
    console.log(this.product);
    if (this.user != "Guest" && this.product){
      if (this.isFav){ // Icon is on now so add the product to the users favorite products
        this.userService.saveProductToUserFav(this.email,this.product["id"])
        .subscribe(response => {
          console.log(response);
        });
      }
      else {
        this.userService.removeProductToUserFav(this.email,this.product["id"])
        .subscribe(response => {
          console.log(response);
        });
      }
    }
  }


}
