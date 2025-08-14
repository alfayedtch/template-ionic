import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(){
      return this.httpClient.get(this.endpoint+'/user');
  }

  getUser(user:User){
    return this.httpClient.get(this.endpoint+'/user/'+user.key);
}

  createUser(userForm:any){
    return this.httpClient.post(this.endpoint+'/user/invite',userForm);
  }

  updateUser(userForm:any){
    return this.httpClient.put(this.endpoint+'/user/update',userForm);
  }
  deleteUser(userForm:any){
    return this.httpClient.delete(this.endpoint+'/user/delete',userForm);
  }
}
