import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Role } from '../../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getRoles(){
      return this.httpClient.get(this.endpoint+'/role');
  }

  getRole(role:Role){
    return this.httpClient.get(this.endpoint+'/role/'+role.code);
}

  createRole(roleForm:any){
    return this.httpClient.post(this.endpoint+'/role/create',roleForm);
  }

  updateRole(roleForm:any){
    return this.httpClient.put(this.endpoint+'/role/update',roleForm);
  }
  deleteRole(roleForm:any){
    return this.httpClient.delete(this.endpoint+'/role/update',roleForm);
  }
}
