import { Component, Input, OnInit } from '@angular/core';
import { IItemInfo } from '../../interfaces/item-info.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss',
})
export class ItemsTableComponent implements OnInit {
  @Input() tableData!: Array<IItemInfo>;

  constructor(
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._setTableData();
  }

  private _setTableData(): void {
    this.tableData = [
      {
        code: 198,
        name: 'Sword',
        type: 'Equipment',
        price: 75,
      },
      {
        code: 176,
        name: 'Shield',
        type: 'Equipment',
        price: 105,
      },
      {
        code: 176,
        name: 'Shield',
        type: 'Equipment',
        price: 105,
      },
      {
        code: 176,
        name: 'Shield',
        type: 'Equipment',
        price: 105,
      },
      {
        code: 176,
        name: 'Shield',
        type: 'Equipment',
        price: 105,
      },
    ];
  }

  public displayedColumns: Array<string> = [
    'code',
    'name',
    'type',
    'price',
    'details',
  ];

  public seeItemDetails(itemCode: number): void {
    this._router.navigateByUrl(`item-detail/${itemCode}`);
  }
}
