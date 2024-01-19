import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-our-blog',
  templateUrl: './our-blog.component.html',
  styleUrls: ['./our-blog.component.css']
})
export class OurBlogComponent implements OnInit {
   teachers:any=[];
  constructor( private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response)=>{
    this.teachers =response.users.filter((user:any) => user.role == 'teacher');
    })
  }

}
