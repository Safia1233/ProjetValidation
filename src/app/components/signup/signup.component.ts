import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup;
  
  path:string="";
  user:any;
  imagePreview:any;
  filePreview:any;
  msgError!:string;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private activateRoute:ActivatedRoute, 
    private userService:UserService) { }

  ngOnInit(): void {
     
    this.path=this.router.url
    console.log("here path", this.path);
    this.signupForm= this.formBuilder.group({
      firstName:["",[Validators.required,Validators.minLength(5)]],
      lastName:["",[Validators.required,Validators.minLength(3)]],
      email:["",[Validators.required,Validators.email]],
      adresse:["",[Validators.required,Validators.minLength(8)]],
      tel:["",[Validators.required,Validators.maxLength(8)]],
      pwd:["",[Validators.required,Validators.minLength(5),Validators.maxLength(8)]],
        speciality:["",[Validators.required]],
       telEnfant:["",[Validators.required,Validators.minLength(8)]],
     
       img:[""],
       file:[""],
    })
     this.addControlsBasedOnPath()
   }
  //  declaration des attribut selon le path
   private addControlsBasedOnPath(): void {

    if (this.path === "/student") {
      this.signupForm.addControl('img', new FormControl(""));
    } else if (this.path === "/parent") {
      this.signupForm.addControl('telEnfant', new FormControl("", [Validators.required, Validators.minLength(8)]));
 
    } else if (this.path === "/teacher") {
      this.signupForm.addControl('speciality', new FormControl("", [Validators.required, Validators.minLength(5)]));
      this.signupForm.addControl('file', new FormControl(""));
  
   }
  
      
  }

  signup(){
    console.log("here signup", this.signupForm.value);
    if (this.path=="/signupAdmin") {
      this.signupForm.value.role = "admin"
    } else if (this.path=="/signupTeacher") {
      this.signupForm.value.role = "teacher";
       this.signupForm.value.status= 'en attente';
      
    } else if (this.path=="/signupParent") {
       let telEnfant = this.signupForm.value.telEnfant
      this.signupForm.value.role = "parent"
      

    }else{
      this.signupForm.value.role = "student"
      // this.signupForm.value.img = this.signupForm.value.file;
      // delete this.signupForm.value.file;
    }

    this.userService.signUp(this.signupForm.value, 
      this.signupForm.value.file,
      this.signupForm.value.img).subscribe((response)=>{
      console.log("here response from BE",response.msg);
      this.msgError=response.msg
    }) 
    
  }
  

  onfileSelected(event: Event) {
    const fileInput = (event.target as HTMLInputElement);
    const file = (fileInput.files as FileList)[0];
    this.signupForm.patchValue({ file: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string
    };
    reader.readAsDataURL(file);

  }

  onImageSelected(event: Event) {
    const fileInput = (event.target as HTMLInputElement);
    const file = (fileInput.files as FileList)[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);

  }


 
}
