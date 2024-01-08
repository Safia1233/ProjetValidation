import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditCourComponent } from './components/edit-cour/edit-cour.component';
import { AffecteStudentComponent } from './components/affecte-student/affecte-student.component';
import { NoteComponent } from './components/note/note.component';
import { DetailsCoursComponent } from './components/details-cours/details-cours.component';


const routes: Routes = [
    // http://localhost:4200: url de base 
  {path:"",component:HomeComponent},
   // http://localhost:4200/login ==> login component va s'afficher  
 {path:"login",component:LoginComponent},
 // http://localhost:4200/signup ==> signup component va s'afficher  

 {path:"signupAdmin",component:SignupComponent},
 {path:"signupTeacher",component:SignupComponent},
 {path:"signupParent",component:SignupComponent},
 {path:"signupStudent",component:SignupComponent},
 // http://localhost:4200/courses ==> courses component va s'afficher 
 {path:"courses",component:CoursesComponent},
 // http://localhost:4200/dashboard ==> dashboard component va s'afficher 
 {path:"dashboard",component:DashboardComponent},
 {path:"affecteStudent",component:AffecteStudentComponent},
 // http://localhost:4200/add course ==> add course component va s'afficher 
 {path:"addCourse",component:AddCoursesComponent},
 {path:"dashbordTeacher",component:DashboardTeacherComponent},
 {path:"dashbordStudent",component:DashboardStudentComponent},
 // http://localhost:4200/editUser ==> edit User component va s'afficher 
 {path:"editUser/:id",component:EditUserComponent},
 {path:"editCour/:id",component:EditCourComponent},
 {path:"addNote",component:NoteComponent},
 {path:"detailsCour/:courId",component:DetailsCoursComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
