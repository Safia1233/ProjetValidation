import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-table-notes',
  templateUrl: './table-notes.component.html',
  styleUrls: ['./table-notes.component.css']
})
export class TableNotesComponent implements OnInit {
notes:any=[];
  constructor(private noteService:NoteService, private router:Router) { }

  ngOnInit(): void {
    this.noteService.getAllNote().subscribe((response)=>{
      console.log("here response from BE",response.notes);
      this.notes=response.notes
    })
  }
  goToDisplay(id:number){
   this.router.navigate([`datailsNote/${id}`])
  }
  goToEdit(id:number){
    this.router.navigate([`editNote/${id}`])

  }
  delete(id:number){
    this.noteService.deleteNote(id).subscribe((response)=>{
     console.log("here response from BE",response.msg);
     this.noteService.getAllNote().subscribe((data)=>{
       console.log("here data from BE",data.notes);
      this.notes = data.notes 
 })
    })
   }
}
