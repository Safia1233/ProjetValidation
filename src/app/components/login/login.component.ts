import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  user:any={};
  loginType:string="";
  errorMsg:any
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }
  login(){

    if (this.loginType == 'email') {
      console.log("connexion with email",this.user.email);
    } else {
      console.log("connexion with tel",this.user.tel);
    }
   
    this.userService.login(this.user).subscribe((data)=>{
      console.log("here response from BE",data.msg,data.token);
       // data.token si je suis connecter avec un email existe
      if (data.token) {
        sessionStorage.setItem("token",data.token);
        let user:any=this.decodeToken(data.token);
        console.log("here user",user);
        console.log("here data token",data.token);
       
        if (user.role == 'teacher') {
          console.log("user role :", user.status);
          
          if (user.status== 'confirmed') {
            
              this.router.navigate(['dashbordTeacher']);
           } else {
              console.log("Teacher not confirmed");
          // this.router.navigate(['dashbordTeacher']);
        }} else if (user.role == 'admin') {
          this.router.navigate(['dashboard']);
        } else if (user.role == 'student') {
          this.router.navigate(['dashbordStudent']);
        } else if (user.role == 'parent') {
          this.router.navigate(['']);
        }
      } 

      else {
        // Display Error
        this.errorMsg ="please check Email/pwd"
      }
    
    })
     
  }

  decodeToken(token: string) {
    return jwt_decode(token);
    }

}
        
       
  
