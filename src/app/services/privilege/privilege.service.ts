import { Injectable } from '@angular/core';
import { Privilege } from '../../interfaces/privilege';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
endpoint = environment.endpoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getPrivileges(){
      return this.httpClient.get(this.endpoint+'/privilege');
  }

  getPrivilege(privilege:Privilege){
    return this.httpClient.get(this.endpoint+'/privilege/'+privilege.code);
}

  createPrivilege(privilegeForm:any){
    return this.httpClient.post(this.endpoint+'/privilege',privilegeForm);
  }

  updatePrivilege(privilegeForm:any){
    return this.httpClient.put(this.endpoint+'/privilege/update',privilegeForm);
  }
  deletePrivilege(privilegeForm:any){
    return this.httpClient.delete(this.endpoint+'/privilege/update',privilegeForm);
  }
}
