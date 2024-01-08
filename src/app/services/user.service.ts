import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string ="http://localhost:3000/users";
  constructor(private httpClient:HttpClient) { }


  login(user:any){
    return this.httpClient.post<{msg:string, token:string}>(this.userUrl +"/login",user)
  }
  signUp(user:any, file:File,img:File ){
  let  formData= new FormData();
  formData.append("firstName",user.firstName);
  formData.append("lastName",user.lastName);
  formData.append("email",user.email);
  formData.append("tel",user.tel);
  formData.append("adresse",user.adresse);
  formData.append("pwd",user.pwd);
  formData.append("speciality",user.speciality);
  formData.append("telEnfant",user.telEnfant);
  formData.append("role",user.role);
  formData.append("status",user.status);
  formData.append("img",img)
  formData.append("file",file)

    return this.httpClient.post<{msg:any}>(this.userUrl +"/subscription",formData)
  }

  getAllUsers(){
    return this.httpClient.get<{users:any}>(this.userUrl) 
  }
  getUserById(id:any){
    return this.httpClient.get<{user:any}>(`${this.userUrl}/${id}`)
  }
  editUser(user:any){
    return this.httpClient.put<{isUpdated:any}>(this.userUrl,user)
  }
  deleteUser(id:any){
    return this.httpClient.delete<{msg:string}>(`${this.userUrl}/${id}`)
  }

 affectStudent(obj:any){
    return this.httpClient.post<{msg:string}>(this.userUrl+"/affecteStudent",obj)
 }
}
