import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-cards-details',
  templateUrl: './cards-details.component.html',
  styleUrl: './cards-details.component.scss'
})
export class CardsDetailsComponent  {;

  constructor( public dialogRef: MatDialogRef<CardsDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}


  public close(): void {
    this.dialogRef.close();
  }
}
