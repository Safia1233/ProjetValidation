import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LibraryCountComponent } from './components/library-count/library-count.component';
import { SearchCourseComponent } from './components/search-course/search-course.component';
import { EventsComponent } from './components/events/events.component';
import { ReviewComponent } from './components/review/review.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { OurBlogComponent } from './components/our-blog/our-blog.component';
import { HomeComponent } from './components/home/home.component';
import { EducationComponent } from './components/education/education.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule} from "@angular/common/http";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { AddCoursesComponent } from './components/add-courses/add-courses.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { CoursComponent } from './components/cours/cours.component';
import { CoursTableComponent } from './components/cours-table/cours-table.component';

import { UsersTableComponent } from './components/users-table/users-table.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditCourComponent } from './components/edit-cour/edit-cour.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { ParentsTableComponent } from './components/parents-table/parents-table.component';
import { AffecteStudentComponent } from './components/affecte-student/affecte-student.component';
import { NoteComponent } from './components/note/note.component';
import { DetailsCoursComponent } from './components/details-cours/details-cours.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
      CoursesComponent,
      LibraryCountComponent,
      SearchCourseComponent,
      EventsComponent,
      ReviewComponent,
      InstructorComponent,
      OurBlogComponent,
      HomeComponent,
      EducationComponent,
      DashboardComponent,
      DashboardTeacherComponent,
      AddCoursesComponent,
      DashboardStudentComponent,
      CoursComponent,
      CoursTableComponent,
      UsersTableComponent,
      EditUserComponent,
      EditCourComponent,
      TeachersTableComponent,
      StudentsTableComponent,
      ParentsTableComponent,
      AffecteStudentComponent,
      NoteComponent,
      DetailsCoursComponent,
      
  
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
