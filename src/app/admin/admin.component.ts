import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ordersList: any = {} ;

  constructor() {
   }

  ngOnInit(): void {

    // this.orderService.getOrders()
    //   .subscribe(response => {
    //     this.ordersList = response;
    //     if (!this.ordersList)
    //       this.ordersList = {};
    //   })

    this.ordersList = {
      "a": 1,
      "b": 2,
    }
  }

}
