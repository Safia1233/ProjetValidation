import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
user:any={};
editFormUser!:FormGroup;
id:any;
errorMsg:any;
path:string="";
  constructor(private userService:UserService,
    private activateRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
 this.id= this.activateRoute.snapshot.paramMap.get("id")
  this.userService.getUserById(this.id).subscribe((data)=>{
    console.log("here data from BE",data);
    this.user=data.user
  })
  }
  editUser(){
   this.userService.editUser(this.user).subscribe((data)=>{
    console.log("here data from BE", data.isUpdated);
    if (data.isUpdated) {
      this.router.navigate(['dashboard'])
    } else {
      this.errorMsg="Error in Editing"
    }
    
   })
  }
}
