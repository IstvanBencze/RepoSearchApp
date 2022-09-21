import { Component, OnInit } from '@angular/core';
import { RepoService } from '../services/repo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public Results: any;

  validCheckboxState: boolean = true;

  searchForm = new FormGroup({
    searchInput: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    nameCheckbox: new FormControl(true),
    descriptionCheckbox: new FormControl(false),
    readmeCheckbox: new FormControl(false),
  });

  submitted = false;

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
    setTimeout(() => {
      if (
        this.searchForm.controls['nameCheckbox'].value == false &&
        this.searchForm.controls['descriptionCheckbox'].value == false &&
        this.searchForm.controls['readmeCheckbox'].value == false
      ) {
        this.validCheckboxState = false;
      }
    }, 0);
    this.validCheckboxState = true;
  }

  public searchRepo() {
    this.submitted = true;
    var searchInput = this.searchForm.controls['searchInput'].value;

    if (this.searchForm.invalid) {
      return;
    }
    if (!this.validCheckboxState) {
      return;
    }

    this.repoService.getRepo(searchInput, this.checkboxValues()).subscribe({
      next: (data) => {
        this.Results = data;
      },
    });
  }

  ngOnInit(): void {}
}
