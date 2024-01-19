import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { coursesData } from 'src/app/data/data';
import { CourService } from 'src/app/services/cour.service';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-cours-table',
  templateUrl: './cours-table.component.html',
  styleUrls: ['./cours-table.component.css']
})
export class CoursTableComponent implements OnInit {
   cours:any=[];
   user:any={};
  
  constructor( private courService:CourService, 
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem("token");
    if(token){
      let user: any = this.decodeToken(token);
      if (user.role =='admin') {
        // L'utilisateur est un administrateur, affichez tous les cours de tous les enseignants
    this.courService.getAllCours().subscribe((response) => {
      console.log("here Response From BE:", response.cours);
      this.cours = response.cours;

    });
      } else if(user.role == 'teacher') {
       
        // this.cours.teacher = user.id;
        this.courService.getTeacherCourses(user.id).subscribe((response)=>{
         console.log("here response from BE",response.cours);
         this.cours= response.cours
       
        })
        }
        else if(user.role == 'student') {
       
          this.courService.getStudentsCourses(user.id).subscribe((response)=>{
           console.log("here response from BE",response.cours);
           this.cours= response.cours
         
          })
          }
       
      else {
        console.log("Rôle non pris en charge");
        // Gérer d'autres rôles si nécessaire
      }
    } 
  }
  // display details cours
  goToDisplay(id:number){
    this.router.navigate([`detailsCour/${id}`])

  }
  goToEdit(id:number){
    this.router.navigate([`editCour/${id}`])
  }
  delete(id:number){
   this.courService.deleteCour(id).subscribe((response)=>{
    console.log("here response from BE",response.msg);
    this.courService.getAllCours().subscribe((data)=>{
      console.log("here data from BE",data.cours);
     this.cours = data.cours 
})
   })
  }
  goToNote(id:number){
    this.router.navigate([`selectNote/${id}`])
  
  }
// Retrieve the JWT token from session storage
isLoggedIn(){
  // recupere token de session storage
const jwt = sessionStorage.getItem("token");
if (jwt) {
  this.user= this.decodeToken(jwt)
}
return !!jwt;
}
  decodeToken(token: any) {
    return jwt_decode(token);
  }
}
