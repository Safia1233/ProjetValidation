import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourService } from 'src/app/services/cour.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-child',
  templateUrl: './search-child.component.html',
  styleUrls: ['./search-child.component.css']
})
export class SearchChildComponent implements OnInit {
  childSearchForm!:FormGroup;
  user:any={};
 cours:any=[];
errorMsg:string="";
courId:any={};
students:any=[]
telEnfant:any;
note:any={}
 obj ={
  courId :'',
  idUser :''
 }
idUser:any
notes: any=[]
  constructor( private userService:UserService, private noteService:NoteService) { }
    
  ngOnInit(): void {
    this.user={telEnfant:''}
    console.log(this.user);
       
  }
  searchChild() {
     this.telEnfant = this.user.telEnfant;
        this.userService.searchNumChild(this.user).subscribe((response) => {
          console.log("here response from BE", response.student);
            if (response.student) {
              // this.notes= response.student.notes
              this.cours = response.student.cour
              // this.courId = response.student.cour._id
              if (this.cours.length== 0) {
                
              } else {
                for (let j = 0; j < this.cours.length; j++) {
                  this.obj.courId= this.cours[j]._id;
                    this.obj.idUser = response.student._id
                  
                  this.noteService.getNoteParent(this.obj).subscribe((response)=>{
                    console.log("here response from BE Get note parent",response.note);
                    this.note= response.note;
                  })
                    }
                   }
            } else {
              this.errorMsg = 'Student not found';
            }
   });
   
 }  
 }

 
