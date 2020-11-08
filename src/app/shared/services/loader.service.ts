import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {

  private isLoading = new Subject<boolean>();

  constructor() { }

  show = (): void => {
    this.isLoading.next(true);
  }

  hide = (): void => {
    this.isLoading.next(false);
  }

  get loading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

}
