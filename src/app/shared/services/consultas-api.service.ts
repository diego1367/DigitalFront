import { Injectable } from "@angular/core";
import { Observable, throwError,   } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map, } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConsultasApiService {
  private url = environment.url;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  }; 

  constructor(private http: HttpClient) { }

  public get (modulo:string, parameters:string ){
    return this.http.get(`${this.url}${modulo}${parameters}`);
  }

  public post(modulo: string, parameters: any) {
   return this.http.post(`${this.url}${modulo}`,parameters);
 }
 public put(modulo: string, parameters: any) {
   return this.http.put(`${this.url}${modulo}`,parameters);
 }

 public delete(modulo:string, parameters:string ){
  return this.http.delete(`${this.url}${modulo}${parameters}`);
}

}
