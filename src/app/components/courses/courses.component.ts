import { Component, OnInit } from '@angular/core';
import { coursesData } from 'src/app/data/data';
import { CourService } from 'src/app/services/cour.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private courService:CourService) { }
   courses:any=[];

  ngOnInit(): void {
    this.courService.getAllCours().subscribe((data)=>{
      console.log("here data from BE",data.cours);
      this.courses = data.cours
    })
    
  }

}
