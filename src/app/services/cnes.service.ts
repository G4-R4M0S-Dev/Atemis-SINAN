import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { concatMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CnesService {
  private readonly baseUrl = '/api/cnes/estabelecimentos?codigo_tipo_unidade=02&status=1';

  constructor(private http: HttpClient) {}

  private fetchPage(codigo_municipio: number, offset: number): Observable<any> {
    const url = `${this.baseUrl}&codigo_municipio=${codigo_municipio}&limit=20&offset=${offset}`;
    return this.http.get(url);
  }

  getEstabelecimentosSaude(codigo_municipio: number): Observable<any[]> {
    const estabelecimentos: any[] = [];
    const limit = 20;
    let offset = 0;

    const recursiveFetch = (offset: number): Observable<any> => {
      return this.fetchPage(codigo_municipio, offset).pipe(
        concatMap(response => {
          estabelecimentos.push(...response.estabelecimentos);

          // Se a resposta contém menos que o limite, significa que é a última página.
          if (response.estabelecimentos.length < limit) {
            return of(estabelecimentos);
          }

          // Caso contrário, incremente o offset e continue buscando.
          offset += limit;
          return recursiveFetch(offset);
        })
      );
    };

    return recursiveFetch(offset).pipe(toArray());
  }
}
