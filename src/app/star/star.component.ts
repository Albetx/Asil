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

    if (this.user != "Guest" && this.product){
      // Remove item from saved list
      if (this.isFav){ // Icon is on now so add the product to the users favorite products
        this.userService.saveProductToUserFav(this.email,this.product["id"])
        .subscribe(response => {
          console.log(response);
        });
      }
      // Add item to saved list
      else {
        this.userService.removeProductToUserFav(this.email,this.product["id"])
        .subscribe(response => {
          console.log(response);
        });
      }
    }

    if (this.isFav){
      window.alert("Item added to your saved-items list.")
    }
    else{
      window.alert("Item removed from your saved-items list.")
    }
  }


}
