import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {
  teacherSearchForm!:FormGroup;
  teacher:any={};
  errorMsg:string="";
  constructor(private userService:UserService) { }

  ngOnInit(): void {

  }
  searchTeacher(){
    const speciality = this.teacher.speciality;
    this.userService.searchTeacher(speciality).subscribe((data)=>{
      console.log("here data from BE",data.teachers);
      if (data.teachers && data.teachers.length > 0) {
        const firstTeacher = data.teachers[0]; 
        this.teacher = { firstName: firstTeacher.firstName , 
                          lastName: firstTeacher.lastName,
                          tel:firstTeacher.tel};
       
    } else {
       
        this.errorMsg = 'Teacher Not found'; 
    }  
}
)}

}

