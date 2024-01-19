import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniversiteService } from 'src/app/services/universite.service';

@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent implements OnInit {
  universiteForm!:FormGroup;
  universiteResult:any={};
  constructor(private formBuilder:FormBuilder,
    private universiteService:UniversiteService) { }

  ngOnInit(): void {
    this.universiteForm =this.formBuilder.group({
      country:["",[Validators.required,Validators.minLength(5)]],
    })
  }
  search(){
    const requestData = {
      country: this.universiteForm.get('country')?.value
  };
   this.universiteService.searchUniversite(requestData).subscribe((data)=>{
   console.log("here response from BE",data.result);
    this.universiteResult=data.result
   })
  }
}
