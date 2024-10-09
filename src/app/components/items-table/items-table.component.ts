import { Component, Input, OnInit } from '@angular/core';
import { IItemInfo } from '../../interfaces/item-info.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss',
})
export class ItemsTableComponent {
  @Input() tableData!: Array<IItemInfo>;

  constructor(
    private _router: Router
  ) {}

  public displayedColumns: Array<string> = [
    'ID',
    'refinement',
    'grade',
    'name',
    'card',
    'price',
    'details',
  ];

  public seeItemDetails(itemCode: number): void {
    this._router.navigateByUrl(`item-detail/${itemCode}`);
  }
}
