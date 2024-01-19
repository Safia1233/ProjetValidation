import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourService } from 'src/app/services/cour.service';
import { NoteService } from 'src/app/services/note.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.css']
})
export class DisplayNoteComponent implements OnInit {
  note:any={};
  cour:any={};
  id:any
 user:any={}
  notes:any=[]
  msgError:any=""
  courId:any

  constructor(private noteService:NoteService, 
    private activateRoute:ActivatedRoute,private courService:CourService) { }

  ngOnInit(): void {

    // this.courId = this.activateRoute.snapshot.paramMap.get("courId");

    // // Vérifier si l'ID est null ou une chaîne vide avant de faire la requête
    // if (this.courId ) {
    //   this.courService.getDetailsCourById(this.courId).subscribe((response) => {
    //     console.log("here response from BE", response.cour);
    //     this.cour = response.cour;
  
    //     let token = sessionStorage.getItem("token");
    //     let user: any = this.decodeToken(token);
    //     user = user.id;
    //       // Utilisez la méthode find pour rechercher la note en fonction de l'ID du cours
    //       const matchingNote = this.notes.find((note:any) => note.courId == this.cour._id);
  
    //       if (matchingNote) {
           
  
    //         this.noteService.getDetailsNoteById(user).subscribe((data) => {
    //           console.log("Here response from BE : ", data.note);
    //           this.note = data.note;
    //         });
    //       } else {
    //         // Gérez le cas où aucune note correspondante n'est trouvée
    //         this.msgError = "No note found for the selected course";
    //       }
    //     // }
      
    //    });
    // } else {
    //   console.log("Invalid course ID");
    //   // Gérer le cas où l'ID du cours est null ou une chaîne vide, par exemple, rediriger ou afficher un message d'erreur
    // }


    let token = sessionStorage.getItem("token");
    let user: any = this.decodeToken(token);
    user = user.id;
    this.noteService.getDetailsNoteById(user).subscribe((data) => {
      
      if ( data.note) {
        this.note = data.note;
      } else {
        console.log("data.msg",data.msg);
        
      }
    })
  
   
}


decodeToken(token: any) {
  return jwt_decode(token);
}
}
