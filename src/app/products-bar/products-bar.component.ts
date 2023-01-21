import { Component, Inject, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'products-bar',
  templateUrl: './products-bar.component.html',
  styleUrls: ['./products-bar.component.css']
})
export class ProductsBarComponent implements OnInit {
  itemsInBar = 5;

  @Input('category') category = "";
  @Input() alignment: string = "left";
  @Input() barName: string = "";
  curProductList: any = [];

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.service.getProductsByCategory(this.category)
      .subscribe((response: any) => {
        this.curProductList = response.slice(0,this.itemsInBar);
      })
  }

}
