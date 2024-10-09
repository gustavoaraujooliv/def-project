import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IItemTypeOption } from '../../interfaces/item-type-option.interface';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { IItemGrade } from '../../interfaces/item-grade.interface';
import { IItemInfo } from '../../interfaces/item-info.interface';
import { IFiltersValue } from '../../interfaces/filters-value.interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent implements OnInit, OnDestroy {
  @Output() emitAutocompleteValue = new EventEmitter<string>();
  @Output() emitFiltersValue = new EventEmitter<IFiltersValue | null>();
  public form!: FormGroup;
  public itemTypes!: Array<IItemTypeOption>;
  @Input() itemsData!: Array<IItemInfo>;
  @Input() gradeOptions: Array<IItemGrade>;
  public autocompleteOptions!: Observable<Array<string>>;
  private itemsNames: Array<string> = [];
  public hiddenFilters = true;
  private readonly destroy$ = new Subject<void>();
  private readonly MINIMUM_STRING_SEARCH_LENGTH = 3;

  constructor(private _formBuilder: FormBuilder) {
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
    this._getItemsNames();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public handleHideFilters(): void {
    this.hiddenFilters = !this.hiddenFilters;
    this._resetOptionalFields();
  }

  private _getItemsNames(): void {
    this.itemsData.forEach((value) => {
      this.itemsNames?.push(`${value.ID} - ${value.name}`);
    });
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
    this.autocompleteOptions = this.form.controls['item'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filterAutocompleteOptions(value)),
      takeUntil(this.destroy$)
    );
  }

  private _filterAutocompleteOptions(value: string): Array<any> {
    const filterValue = value?.trim().toLowerCase();
    if (!value) {
      this.emitAutocompleteValue.emit('');
    }
    return filterValue &&
      filterValue.length >= this.MINIMUM_STRING_SEARCH_LENGTH
      ? this.itemsNames.filter((option) =>
          option.toLowerCase().includes(filterValue)
        )
      : [];
  }

  public filterTableData(matOption: any): void {
    this.emitAutocompleteValue.emit(matOption.source.value);
  }

  public handleFiltersValue(): void {
    if (this.form.value) {
      this.emitFiltersValue.emit(this.form.value);
    }
  }

  public emitCleanFiltersValue(): void {
    this.form.reset();
    this.emitFiltersValue.emit(null);
  }
}
