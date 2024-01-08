import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourService } from 'src/app/services/cour.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-affecte-student',
  templateUrl: './affecte-student.component.html',
  styleUrls: ['./affecte-student.component.css']
})
export class AffecteStudentComponent implements OnInit {

  affecteForm!:FormGroup
  // cour:any={}
 
  students:any=[];
  cours:any=[]
   
 
  studentId:any;
  courId:any;
  obj:any
  constructor(private courservice:CourService, 
    private userService:UserService) { }

  ngOnInit(): void {
    this.courservice.getAllCours().subscribe((data)=>{
      console.log("here data from BE",data.cours);
      this.cours = data.cours
      
     })

    this.userService.getAllUsers().subscribe((response)=>{
      console.log("here data from BE",response.users);
   
     this.students = response.users.filter((user:any)=> user.role =='student');
     
     })
  }

  affecteStudents(){
  
    console.log('Affecting students:', this.studentId)
    

    this.obj={
   
      studentId: this.studentId,
      courId: this.courId,
     
    }
   this.userService.affectStudent(this.obj).subscribe((response)=>{
    console.log("here response from BE", response.msg);
    
   })
    
  }



  selectStudents(evt:any){
    console.log("here event", evt.target.value);
    this.studentId = evt.target.value
  }
  selectCours(evt:any){
    console.log("here event", evt.target.value);
    this.courId = evt.target.value
  }

}
