import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
   noteUrl="http://localhost:3000/notes"
  constructor( private httpClient:HttpClient) { }
   
  getAllNote(){
    return this.httpClient.get(this.noteUrl)
  }
  getNoteById(id:any){
    return this.httpClient.get(`${this.noteUrl}/${id}`)
  }
   addNote(obj:any){
    return this.httpClient.post<{msg:any}>(this.noteUrl,obj)
   }
   editeNote(obj:any){
    return this.httpClient.put(this.noteUrl,obj)
   }
   deleteNote(id:any){
   return this.httpClient.delete(`${this.noteUrl}/${id}`)
   }

}
