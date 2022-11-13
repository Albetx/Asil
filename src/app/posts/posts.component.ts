// import { fade, slide, bounceOutLeftAnimation, fadeInAnimation } from './../animations';
// import { BadInput } from './../common/bad-input';
// import { NotFoundError } from './../common/not-found-error';
// import { AppError } from './../common/app-error';
// import { PostService } from '../services/product.service';
// import { Component, OnInit } from '@angular/core';
// import { animate, animateChild, keyframes, query, state, style, transition, trigger, useAnimation } from '@angular/animations';


// @Component({
//   selector: 'app-posts',
//   templateUrl: './posts.component.html',
//   styleUrls: ['./posts.component.css'],
//   animations: [
//     trigger('todosAnimation',[
//       transition(':enter', [
//         query('h3', [
//           style({ transform: 'translateX(-200px'}),
//           animate(1000)
//         ])
//       ])
//     ]),

//     trigger('todoAnimation', [
//       transition(':enter', [
//         useAnimation(fadeInAnimation, {
//           params: {
//             duration: '1000ms'
//           }
//         })
//       ]),
      
//       transition(':leave', [
//         style({ backgroundColor: 'red'}),
//         animate(1000),
//         useAnimation(bounceOutLeftAnimation)
//       ]),
//     ])
//   ]
// })
// export class PostsComponent implements OnInit {
//   posts!: any;



//   constructor(private service: PostService) {
//    }

//    animationStarted($event: any){
//     // console.log($event);
//    }

//    animationDone($event: any){
//     // console.log($event);
//    }

//    createPost(input: HTMLInputElement){
//     let post: any = {title: input.value};
//     this.posts.splice(0,0,post);

//     input.value = "";

//       this.service.create(post) 
//       .subscribe(response => {
//         post.id = (response as any).id;
//         console.log(response);
//       }, (error: AppError) => {
//         this.posts.splice(0,1);
        
//         if (error instanceof BadInput) {
//           // this.form.setErrors(error.originalError);
//         }
//         else throw error;
//       });
//    }

//    updatePost(post: any){
//     this.service.update(post)
//       .subscribe(
//         response => {
//         console.log(response);
//         });
//    }

//    deletePost(post: any){
//     let index = this.posts.indexOf(post);
//     this.posts.splice(index,1);

//       this.service.delete(post.id)
//         .subscribe(
//           response => {
//           console.log(response);
//         }, 
//           (error: AppError) => {
//             this.posts.splice(index,0,post);
//             if (error instanceof NotFoundError)
//               alert("This post has already been deleted.");
//             else throw error;

//         })
//    }

//   ngOnInit(): void {
//     this.service.getAll()
//       .subscribe(response => this.posts = response);
//   }

// }
