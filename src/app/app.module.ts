import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './Authentication/auth.service';
import { RouterModule } from '@angular/router';
import { AppErrorHeandler } from './common/app-error-handler';
import { ErrorHandler, Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarComponent } from './star/star.component';
import { LikeComponent } from './like/like.component';
import { ZippyComponent } from './zippy/zippy.component';
import { AddCourseFormComponent } from './add-course-form/add-course-form.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { ProductsComponent } from './products-category/products.component';
import { ProductPageComponent } from './product-page/product-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserService } from './services/user.service';
import { ProductsBarComponent } from './products-bar/products-bar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    StarComponent,
    LikeComponent,
    ZippyComponent,
    AddCourseFormComponent,
    ChangePasswordFormComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    AdminComponent,
    NoAccessComponent,
    ProductsComponent,
    ProductPageComponent,
    ProductsBarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    MatPaginatorModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '', 
        component: HomeComponent
      },
      {
        path: 'product-page/:id/:name', 
        component: ProductPageComponent
      },
      {
        path: 'multimedia/:type', 
        component: ProductsComponent
      },
      {
        path: 'items/:type', 
        component: ProductsComponent
      },
      {
        path: 'admin', 
        component: AdminComponent,
        canActivate: [AuthGuard, AdminAuthGuard]
      },
      {
        path: 'login', 
        component: LoginComponent
      },
      {
        path: 'no-access', 
        component: NoAccessComponent
      },
      {
        path: '**', 
        component: NotFoundComponent
      },
    ])
  ],
  providers: [
    ProductService,
    UserService,
    {provide: ErrorHandler, useClass: AppErrorHeandler},
    AuthService,

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
