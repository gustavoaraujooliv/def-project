import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IItemTypeOption } from '../../interfaces/item-type-option.interface';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { IItemGrade } from '../../interfaces/item-grade.interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public itemTypes!: Array<IItemTypeOption>;
  @Input() autocompleteOptions: Array<string>;
  @Input() gradeOptions: Array<IItemGrade>;
  public filteredOptions!: Observable<Array<string>>;
  public hiddenFilters = true;
  private readonly destroy$ = new Subject<void>();
  private readonly MINIMUM_STRING_SEARCH_LENGTH = 3;

  constructor(private _formBuilder: FormBuilder) {
    this.autocompleteOptions = [
      '1 - Great Sword',
      '4 - Silver Dagger',
      '5 - Red Cape',
    ];
    this.gradeOptions = [
      {
        id: 1,
        grade: 'D',
      },
      {
        id: 2,
        grade: 'C',
      },
      {
        id: 3,
        grade: 'B',
      },
      {
        id: 4,
        grade: 'A',
      },
    ];
  }

  public ngOnInit(): void {
    this._prepareForm();
    this._watchAutocomplete();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleHideFilters(): void {
    this.hiddenFilters = !this.hiddenFilters;
    this._resetOptionalFields();
    console.log(this.form.value);
  }

  private _resetOptionalFields(): void {
    this.form.patchValue({
      card: null,
      refinement: null,
      grade: null,
    });
  }

  private _prepareForm(): void {
    this.form = this._formBuilder.group({
      item: [null],
      refinement: [null, [Validators.max(20)]],
      card: [null],
      grade: [null],
    });
  }

  private _watchAutocomplete(): void {
    this.filteredOptions = this.form.controls['item'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filterAutocompleteOptions(value)),
      takeUntil(this.destroy$)
    );
  }

  private _filterAutocompleteOptions(value: string): Array<string> {
    const filterValue = value.trim().toLowerCase();
    return filterValue &&
      filterValue.length >= this.MINIMUM_STRING_SEARCH_LENGTH
      ? this.autocompleteOptions.filter((option) =>
          option.toLowerCase().includes(filterValue)
        )
      : [];
  }
}
