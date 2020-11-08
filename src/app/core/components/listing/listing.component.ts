import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/shared/services/application.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { API_URLS } from 'src/app/shared/consts/apiURLs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  list: Array<any> = [];

  constructor(private activatedRoute: ActivatedRoute, private api: ApplicationService, private router: Router) { }

  public ngOnInit(): void {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          return this.activatedRoute.queryParams
            .pipe(
              switchMap(params => {
                return this.api.get(API_URLS.launch_url, {
                  limit: 100,
                  ...params
                });
              })
            ).subscribe((list) => {
              this.list = list || [];
            });
        }
      });
  }

}
