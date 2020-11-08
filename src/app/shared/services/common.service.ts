import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) { }

  navigate = (path, id?): void => {
    if (id) {
      this.router.navigate([path, ...id]);
    } else {
      this.router.navigate([path]);
    }
  }

  navigateByUrl = (url): void => {
    this.router.navigateByUrl(url);
  }

  createUrlTree = () => {

  }
}
