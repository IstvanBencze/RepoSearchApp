import { Component, OnInit } from '@angular/core';
import { RepoService } from '../services/repo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public Results: any[] | undefined;
  public TotalResults: any;
  public sortBy = 'default';
  public orderBy = 'desc';
  public pageSize = 10;
  public pageIndex = 0;
  public ErrorMessage: any;

  invalidCheckboxState: boolean = false;

  searchForm = new FormGroup({
    searchInput: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    nameCheckbox: new FormControl<boolean>(false, { nonNullable: true }),
    descriptionCheckbox: new FormControl<boolean>(false, { nonNullable: true }),
    readmeCheckbox: new FormControl<boolean>(false, { nonNullable: true }),
  });

  submitted = false;
  isLoading = false;

  constructor(private repoService: RepoService) {}

  get f() {
    return this.searchForm.controls;
  }

  public checkboxValues() {
    var name = this.searchForm.controls['nameCheckbox'].value;
    var description = this.searchForm.controls['descriptionCheckbox'].value;
    var readme = this.searchForm.controls['readmeCheckbox'].value;

    return `${name ? 'name,' : ''}${description ? 'description,' : ''}${
      readme ? 'readme,' : ''
    }`;
  }

  validateCheckboxes() {
    return (
      this.searchForm.controls['nameCheckbox'].value == false &&
      this.searchForm.controls['descriptionCheckbox'].value == false &&
      this.searchForm.controls['readmeCheckbox'].value == false
    );
  }

  public searchRepo() {
    this.submitted = true;
    var searchInput = this.searchForm.controls['searchInput'].value;

    if (this.searchForm.invalid) {
      return;
    }

    this.invalidCheckboxState = this.validateCheckboxes();
    if (this.invalidCheckboxState) {
      return;
    }

    this.isLoading = true;
    this.repoService
      .getRepo(
        searchInput,
        this.checkboxValues(),
        this.sortBy,
        this.orderBy,
        this.pageSize,
        this.pageIndex
      )
      .subscribe({
        next: (data) => {
          this.Results = data.items;
          this.TotalResults = data.total_count;
          this.isLoading = false;
        },
        error: (err) => {
          this.ErrorMessage = `${err.error.message}`;
          this.isLoading = false;
        },
      });
  }

  public reset() {
    this.Results = undefined;
    this.sortBy = 'default';
    this.orderBy = 'desc';
    this.pageIndex = 0;
  }

  public pageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.searchRepo();
  }

  ngOnInit(): void {}
}
