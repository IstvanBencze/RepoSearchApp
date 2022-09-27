import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  constructor(private http: HttpClient) {}

  public getRepo(searchBy: string|null,searchIn:string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/search/repositories?q=${searchBy}+in:${searchIn}`
    );
  }
}
