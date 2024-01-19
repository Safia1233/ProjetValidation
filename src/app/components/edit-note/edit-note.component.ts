import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
  editFormNotes!:FormGroup;
  note:any={};
  id:any
  errorMsg:any;
  constructor(private noteService:NoteService,
     private router:Router, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get("id")
    this.noteService.getNoteById(this.id).subscribe((response)=>{
      console.log("here response from BE",response.note);
      this.note = response.note
  })
  }
  editNotes(){
    this.noteService.editeNote(this.note).subscribe((response)=>{
      console.log("here response from BE",response.isUpdated);
      if (response.isUpdated) {
        this.router.navigate(['dashbordTeacher'])
      } else {
        this.errorMsg ="Error Editing"
      }
      
    })
    }
}
