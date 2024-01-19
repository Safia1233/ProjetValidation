import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
   noteUrl="http://localhost:3000/notes"
  constructor( private httpClient:HttpClient) { }
   
  getAllNote(){
    return this.httpClient.get<{notes:any}>(this.noteUrl)
  }
  getNoteById(id:any){
    return this.httpClient.get<{note:any}>(`${this.noteUrl}/${id}`)
  }
   addNote(obj:any){
    return this.httpClient.post<{msg:any}>(this.noteUrl,obj)
   }
   editeNote(obj:any){
    return this.httpClient.put<{isUpdated:boolean}>(this.noteUrl,obj)
   }
   deleteNote(id:any){
   return this.httpClient.delete<{msg:string}>(`${this.noteUrl}/${id}`)
   }
   getDetailsNoteById( user:any) {
    
    return this.httpClient.get<{  note: any, msg:any }>(`${this.noteUrl}/detailsNote/${user}`)
  }
  getNoteParent(obj:any){
   return this.httpClient.post<{note:any}>(this.noteUrl+ "/noteParent",obj)
  }

}
