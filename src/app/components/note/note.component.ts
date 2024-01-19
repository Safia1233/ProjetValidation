import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourService } from 'src/app/services/cour.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  addFormNote!: FormGroup;
  note: any = {};
  students: any = [];
  cours: any = [];
  cour:any={}
  studentId: any;
  courId: any;
  constructor(private noteService: NoteService,
    private userService: UserService,
    private courService: CourService,private activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    
    let token = sessionStorage.getItem("token");
    if(token){
      let user: any = this.decodeToken(token);
        this.cours.teacher = user.id;
        // this.students.teacher = user.id
        
        this.courService.getTeacherCourses(user.id).subscribe((response)=>{
         console.log("here response from BE",response.cours);
         this.cours= response.cours;


        //  this.courId = this.activatedRoute.snapshot.paramMap.get("courId")
        //  this.courService.getDetailsCourById(this.courId).subscribe((data)=>{
        //   console.log("here data from BE",data.cour);
        //   this.cour=data.cour
           // Assurez-vous que data.cour.students est un tableau d'identifiants d'étudiants
     
 
          // Maintenant, vous pouvez récupérer les détails des étudiants affectés à ce cours
          // this.userService.getAllUsers().subscribe((response) => {
          //   console.log("Étudiants affectés à ce cours", response.users);
          //   // Faites quelque chose avec les détails des étudiants, par exemple, assignez-les à une propriété de composant
          //   this.students = response.users.filter((student: any) => student && student.role == 'student');;
          // });
    
        //  })


        //  this.userService.getAllUsers().subscribe((response) => {
          // this.userService.getAllUsers().subscribe((response) => {
          //   console.log("Réponse de getAllUsers", response.users);
          //   const uniqueStudents = new Set<string>();
          //   this.students = this.cours.flatMap((course:any) => course.students)
          //   .map((studentId:any) => response.users.find((user: any) => user._id == studentId))
          //   .filter((student: any) => {
          //    if (student && student.role === 'student') {
          //     uniqueStudents.add(student._id);
          //    return true;
          //   }
          //    return false;
          //        })
              
          //      });
             });
    
            console.log("Étudiants filtrés", this.students);
          }
        }
          // });
             // Utiliser map et flatMap pour extraire tous les étudiants associés aux cours de l'enseignant
        // this.students = this.cours.flatMap((course:any) => course.students)
        // .map((studentId:any) => response.users.find((user: any) => user._id == studentId))
        // .filter((student: any) => student && student.role == 'student');

        //    console.log("Étudiants filtrés", this.students);
      // });
        // })
       
 
  addNote() {
    this.note.idCour = this.courId;
    this.note.idStudent = this.studentId

    this.noteService.addNote(this.note).subscribe((response) => {
      console.log("here response from BE", response.msg);

    })
  }
  selectStudents(evt: any) {
    console.log("here event", evt.target.value);
    this.studentId = evt.target.value
  }

  selectCour(evt: any) {
    console.log("here event", evt.target.value);
    this.courId = evt.target.value
    this.courService.getDetailsCourById(this.courId).subscribe((data)=>{
      console.log("here data from BE",data.cour);
     this.students = data.cour.students
    })
  }
  decodeToken(token: any) {
    return jwt_decode(token);
  }
}
