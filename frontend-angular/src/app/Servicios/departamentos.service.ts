import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DepartamentosService {

    constructor(private _http: HttpClient) { }

    getDepartamentos(): Observable<any[]> {
        return this._http.get<any[]>(`https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json`);
    }
}
