import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take, filter } from 'rxjs/operators';
import { FilterOption } from '../../../shared/interfaces/filter-option.interface';
import { CommonService } from '../../../shared/services/common.service';
import { FILTEROPTIONS } from 'src/app/shared/consts/filter-options';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filterForm: FormGroup;
  filterOptions: FilterOption[] = [];

  constructor(
    private common: CommonService,
    private fb: FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.filterOptions = FILTEROPTIONS;
    this.filterForm = this.fb.group({
      launch_year: [],
      launch_success: [],
      land_success: []
    });
    this.filterForm.valueChanges.subscribe((value) => {
      const routeURL = this.router.createUrlTree([], { relativeTo: this.activatedRoute, queryParams: value }).toString();
      this.common.navigateByUrl(routeURL);
    });
    this.activatedRoute.queryParams
      .pipe(
        filter(event => Object.keys(event).length > 0),
        take(1))
      .subscribe((params) => {
        this.filterForm.patchValue(params);
      });
  }

}
