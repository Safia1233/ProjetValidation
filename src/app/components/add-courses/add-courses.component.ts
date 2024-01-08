import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourService } from 'src/app/services/cour.service';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {
  addFormCours!: FormGroup
  cour: any = {}
  teachers: any=[];
  // teacherId:any;

  // students:any=[];
  // studentId:any;
  imagePreview: any;
  img: any;
  constructor(private courservice: CourService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      // Filtrer les utilisateurs avec le rôle 'teacher'
      // this.teachers =response.users.filter((user:any) => user.role == 'teacher');
      // this.students = response.users.filter((user:any)=> user.role =='student');


    })
  }
  addCours() {
    // console.log("here add cours", this.cour);
    let token = sessionStorage.getItem("token");
    let user: any = this.decodeToken(token);
    this.cour.teacher = user.id;


    this.courservice.addCour(this.cour, this.img).subscribe((response) => {
      console.log("here response from BE", response.msg);

    })
  }

  decodeToken(token: any) {
    return jwt_decode(token);
  }
  onImageSelected(event: Event) {
    const fileInput = (event.target as HTMLInputElement);
    // const file = (fileInput.files as FileList)[0];
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.img = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string
      };
      reader.readAsDataURL(file);
    }
  }
}
