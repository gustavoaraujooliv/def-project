import { Component } from '@angular/core';

@Component({
  selector: 'app-consult-items',
  templateUrl: './consult-items.component.html',
  styleUrl: './consult-items.component.scss'
})
export class ConsultItemsComponent {
  public hiddenFilters = true;

  public handleHideFilters(): void {
    this.hiddenFilters = !this.hiddenFilters;
  }
}
