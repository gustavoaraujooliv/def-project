import { Component, OnInit } from '@angular/core';
import { IItemInfo } from '../../interfaces/item-info.interface';
import { EGrade } from '../../enums/grade.enum';
import { IFiltersValue } from '../../interfaces/filters-value.interface';

@Component({
  selector: 'app-consult-items',
  templateUrl: './consult-items.component.html',
  styleUrl: './consult-items.component.scss',
})
export class ConsultItemsComponent implements OnInit {
  public hiddenFilters = true;
  public filteredTableData: Array<IItemInfo> = [];
  private autocompleteSelection = '';

  public gradeRef: { [type: number]: string } = {
    [EGrade.D]: 'D',
    [EGrade.C]: 'C',
    [EGrade.B]: 'B',
    [EGrade.A]: 'A',
  };

  public initialTableData: Array<IItemInfo> = [
    {
      ID: 188,
      refinement: 11,
      grade: 'D',
      name: 'Dark Sword',
      card: 'Carta Teste Selada',
      price: 75,
    },
    {
      ID: 178,
      refinement: 9,
      grade: 'D',
      name: 'Light Sword',
      card: 'Carta Drake Selada',
      price: 75,
    },
    {
      ID: 148,
      refinement: 8,
      grade: 'B',
      name: 'Light Sword',
      card: 'Carta Drake Selada',
      price: 75,
    },
    {
      ID: 138,
      refinement: 11,
      grade: 'B',
      name: 'Light Dagger',
      card: 'Carta Drake Selada',
      price: 75,
    },
    {
      ID: 128,
      refinement: 11,
      grade: 'A',
      name: 'Dark Dagger',
      card: 'Carta Drake Selada',
      price: 75,
    },
  ];

  ngOnInit(): void {
    this.filteredTableData = this.initialTableData;
  }

  public handleHideFilters(): void {
    this.hiddenFilters = !this.hiddenFilters;
  }

  public handleAutocompletValue(itemSelected: string): void {
    this.autocompleteSelection = itemSelected;
    if (itemSelected) {
      const itemName = itemSelected.split(' - ')[1];
      const itemID = itemSelected.split(' - ')[0];
      this.filteredTableData = this.initialTableData.filter(
        (value) => value.name === itemName && value.ID === Number(itemID)
      );
      return;
    }
    this.filteredTableData = this.initialTableData;
  }

  public handleFiltersValue(formValue: IFiltersValue | null): void {
    console.log(formValue, 'formVaslue');
    if (!formValue) {
      this.filteredTableData = this.initialTableData;
      return;
    }
    this.filteredTableData = this.initialTableData;
    this.handleAutocompletValue(this.autocompleteSelection);
    if (formValue) {
      this.filteredTableData = this.filteredTableData.filter((value) => {
        return (
          value.grade === (this.gradeRef[formValue.grade] ?? value.grade) &&
          value.refinement === (formValue.refinement ?? value.refinement) &&
          value.card.includes(formValue.card ?? value.card)
        );
      });
    }
  }
}
