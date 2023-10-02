import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private baseUrl: string = 'https://brasilaberto.com/api/v1/zipcode/';

  constructor(private http: HttpClient) { }

  getCepDetails(cep: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${cep}`).pipe(
      map(response => {
        // Aqui estamos retornando diretamente o objeto result
        return response.result;
      })
    );
  }
}
