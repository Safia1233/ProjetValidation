import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourService {
  courUrl: string = "http://localhost:3000/cours"
  constructor(private httpClient: HttpClient) { }

  getAllCours() {
    return this.httpClient.get<{ cours: any }>(this.courUrl);
  }
  getCourById(id: any) {
    return this.httpClient.get<{ cour: any }>(`${this.courUrl}/${id}`);
  }

  addCour(obj: any, img: File) {
    let formData = new FormData();
    formData.append("nameCour", obj.nameCour);
    formData.append("description", obj.description);
    formData.append("dure", obj.dure);
    formData.append("teacher", obj.teacher);
    formData.append("img", img);
    return this.httpClient.post<{ msg: string }>(this.courUrl, formData);
  }

  editCour(obj: any) {
    return this.httpClient.put<{ isUpdated: boolean }>(this.courUrl, obj);
  }
  deleteCour(id: any) {
    return this.httpClient.delete<{ msg: string }>(`${this.courUrl}/${id}`);
  }
  getDetailsCourById(courId: any) {
    return this.httpClient.get<{ cour: any }>(`${this.courUrl}/details/${courId}`)
  }
  getTeacherCourses(teacher:any){
     return this.httpClient.get<{cours:any}>(`${this.courUrl}/teacherCourses/${teacher}`)
  }
  getStudentsCourses(studentId:any){
    return this.httpClient.get<{cours:any}>(`${this.courUrl}/studentCourses/${studentId}`)
  }
  // getDetailsNoteById(courId: any) {
  //   return this.httpClient.get<{ cour: any }>(`${this.courUrl}/detailsNote/${courId}`)
  // }

}
