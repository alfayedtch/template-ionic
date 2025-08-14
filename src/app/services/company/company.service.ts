import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Company } from '../../interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

 endpoint = environment.endpoint;

   constructor(
     private httpClient: HttpClient
   ) { }

   getCompanies(){
       return this.httpClient.get(this.endpoint+'/company');
   }

   getCompany(company:Company){
     return this.httpClient.get(this.endpoint+'/company/'+company.key);
 }

    getCompanyClients(key:string){
      return this.httpClient.get(this.endpoint+'/company/'+key+'/client');
    }

   createCompany(companyForm:any){
     return this.httpClient.post(this.endpoint+'/company',companyForm);
   }

   updateCompany(companyForm:any){
     return this.httpClient.put(this.endpoint+'/company/update',companyForm);
   }
   deleteCompany(companyForm:any){
     return this.httpClient.delete(this.endpoint+'/company/update',companyForm);
   }
 }
