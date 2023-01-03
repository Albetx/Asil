import { UserService } from './../services/user.service';
import { fade, slide, bounceOutLeftAnimation, fadeInAnimation } from './../animations';
import { Component, OnInit } from '@angular/core';
import { animate, animateChild, keyframes, query, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('todosAnimation',[
      transition(':enter', [
        query('h3', [
          style({ transform: 'translateX(-200px'}),
          animate(1000)
        ])
      ])
    ]),

    trigger('todoAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1000ms'
          }
        })
      ]),
      
      transition(':leave', [
        style({ backgroundColor: 'red'}),
        animate(1000),
        useAnimation(bounceOutLeftAnimation)
      ]),
    ])
  ]
})
export class AdminComponent implements OnInit {
  roles = ["ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_USER"];
  users:any = [];
  curUsersList:any = []; // Affected by search box
  selectControl = new FormControl();
  inputValue: string = "";

  constructor(private service: UserService) {
   }

   animationStarted($event: any){
    // console.log($event);
   }

   animationDone($event: any){
    // console.log($event);
   }

   // Add a role to a user with the email shows in the current line, the role is selected from a select box.
   addRoleToUser (email: string){
    let role = this.selectControl.value;
    if (this.roles.includes(role)) {
      this.service.addRoleToUser(email, role)
        .subscribe(response => {
          location.reload();
          window.alert("Role added successfully");
        });
    }
   }

   // Delete the rule from the current line, from the user in the current box.
   deleteRole (email: string, role: string){
    this.service.removeRoleFromUser(email, role)
      .subscribe(response => {
        location.reload();
        window.alert("Role removed successfully");
      });
   }

  ngOnInit(): void {
    this.service.getAllUsers()
      .subscribe((response:any) => {
        this.users = response;
        this.onInputChange();
      });
  }

  // Update users list to include only users that contains name or email as apear in the search box
  onInputChange(){
    let curListIdx = 0;
    this.curUsersList = [];
    for (let i=0; i<this.users.length; i++){
      if (String(this.users[i]['name']).toLowerCase().includes(this.inputValue.toLowerCase()) ||
           String(this.users[i]['email'].toLowerCase()).includes(this.inputValue.toLowerCase())){
        this.curUsersList[curListIdx] = this.users[i];
        curListIdx++;
      }
    }
  }

}
