import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users:any=[];
  id:any;
  // user:any
  constructor(private userService:UserService,
   private router:Router) { }

  ngOnInit(): void {
    // this.id= this.activatedRoute.snapshot.paramMap.get("id")
   this.userService.getAllUsers().subscribe((response)=>{
    console.log("here response from BE",response.users);
    this.users=response.users
   })
  }
  validate(id:number){
    this.userService.validate(id).subscribe((response)=>{
      console.log("here response from BE",response.isUpdated);
      this.users.status=response.isUpdated;
      this.router.navigate(['dashboard'])
    })
  }
  goToDisplay(id:number){

  }
goToEdit(id:number){
this.router.navigate([`editUser/${id}`])
}
delete(id:number){
 this.userService.deleteUser(id).subscribe((response)=>{
   console.log("here response from BE",response);
   this.userService.getAllUsers().subscribe((response)=>{
    console.log("here respose from BE",response.users);
    this.users=response.users
    
   })
   
 })
}
}
