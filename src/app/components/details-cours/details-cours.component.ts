import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourService } from 'src/app/services/cour.service';

@Component({
  selector: 'app-details-cours',
  templateUrl: './details-cours.component.html',
  styleUrls: ['./details-cours.component.css']
})
export class DetailsCoursComponent implements OnInit {
  courId:any;
  cour:any;
  constructor(private activatedRoute:ActivatedRoute,
    private courService:CourService) { }

  ngOnInit(): void {
    this.courId = this.activatedRoute.snapshot.paramMap.get("courId")
    this.courService.getDetailsCourById(this.courId).subscribe((data)=>{
     console.log("here data from BE",data.cour);
     this.cour=data.cour
    })
  }

}
