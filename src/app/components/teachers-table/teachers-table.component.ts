import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
   user:any ={};
   users:any =[]
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  //  this.userService.getAllTeacher().subscribe((data)=>{
  //   console.log("here data from BE",data.users);
  //   this.users=data.users
  //  })
  }
  goToDisplay(id:number){

  }
  goToEdit(id:number){

  }
 delete(id:number){
  
    // this.userService.deleteTeacher(id).subscribe((response)=>{
    //   console.log("here response from BE",response);
    //   this.userService.getAllUsers().subscribe((response)=>{
    //    console.log("here respose from BE",response.users);
    //    this.users=response.users
       
    //   })
      
    // })

}
}
