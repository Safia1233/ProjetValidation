import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourService } from 'src/app/services/cour.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  addFormNote!:FormGroup;
  note:any={};
   students:any=[];
   cours:any=[];

   studentId:any;
   courId:any;
  constructor( private noteService:NoteService,
    private userService:UserService,
     private courService:CourService) { }

  ngOnInit(): void {
    this.courService.getAllCours().subscribe((data)=>{
    console.log("here data from BE",data.cours);
    this.cours = data.cours
    });
    this.userService.getAllUsers().subscribe((response)=>{
      console.log("here data from BE",response.users);
    this.students=response.users.filter((user:any)=> user.role=='student');
    })
  }
  addNote(){
    console.log("here note",this.note);
    
   this.note.idCour=this.courId;
   this.note.idStudent= this.studentId
   
  this.noteService.addNote(this.note).subscribe((response)=>{
    console.log("here response from BE",response.msg);
    
  })
  }
  selectStudents(evt: any) {
    console.log("here event", evt.target.value);
   this.studentId = evt.target.value
  }

  selectCour(evt: any) {
    console.log("here event", evt.target.value);
   this.courId = evt.target.value
  }
}
