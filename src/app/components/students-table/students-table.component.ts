import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {
  users:any=[]
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    // this.userService.getAllStudent().subscribe((response)=>{
    // console.log("here response from BE",response.students);
    // this.users=response.students
    // })
  }
  goToDisplay(id:any){

  }
  goToEdit(id:any){

  }
  delete(id:any){

  }

}
