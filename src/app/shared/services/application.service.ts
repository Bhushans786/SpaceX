import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  get = (path: string, params: any) => {
    return this.http.get(`${environment.url}${path}`, { params }).pipe(
      map((response: any) => {
        return response;

      })
    );


  }
}
