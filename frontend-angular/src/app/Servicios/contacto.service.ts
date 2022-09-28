import { Contacto } from './../Modelos/contacto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private _http: HttpClient) { }

  create(contacto: Contacto): Observable<any> {
    return this._http.post<Contacto>(`http://localhost:3002/contacto/create`, contacto);
  }

}
