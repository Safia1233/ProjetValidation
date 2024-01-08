import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { coursesData } from 'src/app/data/data';
import { CourService } from 'src/app/services/cour.service';

@Component({
  selector: 'app-cours-table',
  templateUrl: './cours-table.component.html',
  styleUrls: ['./cours-table.component.css']
})
export class CoursTableComponent implements OnInit {
   cours:any=[];
  constructor( private courService:CourService, 
    private router:Router) { }

  ngOnInit(): void {
    this.courService.getAllCours().subscribe((data)=>{
          console.log("here data from BE",data.cours);
         this.cours = data.cours 
    })
  }
  // display details cours
  goToDisplay(id:number){
    this.router.navigate([`detailsCour/${id}`])

  }
  goToEdit(id:number){
    this.router.navigate([`editCour/${id}`])
  }
  delete(id:number){
   this.courService.deleteCour(id).subscribe((response)=>{
    console.log("here response from BE",response.msg);
    this.courService.getAllCours().subscribe((data)=>{
      console.log("here data from BE",data.cours);
     this.cours = data.cours 
})
   })
  }
}
