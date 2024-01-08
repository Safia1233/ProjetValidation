import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourService } from 'src/app/services/cour.service';

@Component({
  selector: 'app-edit-cour',
  templateUrl: './edit-cour.component.html',
  styleUrls: ['./edit-cour.component.css']
})
export class EditCourComponent implements OnInit {
  editFormCours!:FormGroup
  cour:any={}
  id:any
  errorMsg:any;
  constructor(private courService:CourService,
   private router:Router, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    this.courService.getCourById(this.id).subscribe((response)=>{
      console.log("here response from BE",response.cour);
      this.cour = response.cour
    })
  }
  editCours(){
  this.courService.editCour(this.cour).subscribe((response)=>{
    console.log("here response from BE",response.isUpdated);
    if (response.isUpdated) {
      this.router.navigate(['dashbordTeacher'])
    } else {
      this.errorMsg ="Error Editing"
    }
    
  })
  }
}
