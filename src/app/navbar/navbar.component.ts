import { AuthService } from './../Authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchInputValue = '';

  constructor() {
   }

  ngOnInit(): void {
  }

  get InputValue() {
    return this.searchInputValue;
  }

}
