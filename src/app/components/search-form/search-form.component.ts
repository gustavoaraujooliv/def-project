import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IItemTypeOption } from '../../interfaces/item-type-option.interface';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnInit {
  public form!: FormGroup;
  public itemTypes!: Array<IItemTypeOption>;

  constructor(
    private _formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this._prepareForm();
    this._setSelectOptions();
  }

  private _prepareForm(): void {
    this.form = this._formBuilder.group({
      itemCode: [null],
      itemName: [null],
      itemType: [null]
    })
  }

  private _setSelectOptions(): void {
    this.itemTypes = [
      {
        id: 1,
        value: 'test1',
      },
      {
        id: 2,
        value: 'test2'
      }
    ];
  }

}
