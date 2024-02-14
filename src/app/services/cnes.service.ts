import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { concatMap, takeWhile, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CnesService {
  private readonly baseUrl = '/cnes/estabelecimentos?status=1';
  // private readonly baseUrl = 'https://apidadosabertos.saude.gov.br/api/v1/cnes/estabelecimentos?status=1';
  // private readonly baseUrl = '/.netlify/functions/cnes';

  constructor(private http: HttpClient) {}

  private fetchPage(codigo_municipio: number, codigo_tipo_unidade: string, offset: number): Observable<any> {
    const url = `${this.baseUrl}&codigo_municipio=${codigo_municipio}&codigo_tipo_unidade=${codigo_tipo_unidade}&limit=20&offset=${offset}`;
    return this.http.get(url);
  }

  private fetchAllPages(codigo_municipio: number, codigo_tipo_unidade: string): Observable<any[]> {
    const limit = 20;
    let offset = 0;
    const results: any[] = [];

    const fetchPageObservable = (offset: number): Observable<any> => {
      return this.fetchPage(codigo_municipio, codigo_tipo_unidade, offset).pipe(
        concatMap(response => {
          results.push(...response.estabelecimentos);

          if (response.estabelecimentos.length < limit) {
            // Se a resposta contém menos que o limite, significa que é a última página.
            return of(results);
          }

          offset += limit;
          return fetchPageObservable(offset);
        })
      );
    };

    return fetchPageObservable(offset);
  }

  getEstabelecimentosSaude(codigo_municipio: number): Observable<any[]> {
    const estabelecimentosTipo01$ = this.fetchAllPages(codigo_municipio, '01');
    const estabelecimentosTipo02$ = this.fetchAllPages(codigo_municipio, '02');

    return forkJoin([estabelecimentosTipo01$, estabelecimentosTipo02$]).pipe(
      map(([estabelecimentosTipo01, estabelecimentosTipo02]) => [...estabelecimentosTipo01, ...estabelecimentosTipo02])
    );
  }
}
