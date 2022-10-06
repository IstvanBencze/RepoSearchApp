import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  constructor(private http: HttpClient) {}

  public getRepo(
    searchBy: string | null,
    searchIn: string,
    sortBy: string,
    orderBy: string,
    pageSize: number,
    pageIndex: number
  ): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/search/repositories?q=${searchBy}+in:${searchIn}&sort=${sortBy}&order=${orderBy}&page=${pageIndex + 1}&per_page=${pageSize}`
    );
  }
}
