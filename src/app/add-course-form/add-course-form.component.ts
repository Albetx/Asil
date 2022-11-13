import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.css']
})
export class AddCourseFormComponent  {
  categories = [
    {id: 1, name: 'Java'},
    {id: 2, name: 'Python'},
  ];

  submit(f: any){
    console.log(f.value);
  }

}
