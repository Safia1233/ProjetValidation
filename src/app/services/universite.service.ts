import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversiteService {
  universiteUrl: string ="http://localhost:3000/universites"
  constructor(private httpClient:HttpClient) { }

   searchUniversite(country:any){
    return this.httpClient.post<{result:any}>(this.universiteUrl,country)
   }
}
