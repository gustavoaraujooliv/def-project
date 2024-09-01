import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItemDetail } from '../../interfaces/item-detail.interface';
import { IPriceData } from '../../interfaces/price-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { CardsDetailsComponent } from '../cards-details/cards-details.component';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
})
export class ItemDetailsComponent implements OnInit {
  public itemDetailData!: IItemDetail;
  public risingPrice = false;
  public priceHistory!: Array<IPriceData>;

  constructor(private _activeRoute: ActivatedRoute, private _router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe((value) => {
      console.log(value['id']);
    });
    this.itemDetailData = {
      id: 178,
      name: 'Poenitentia Nervus',
      refinement: 11,
      price: 154.5,
      grade: 'C',
      cards: [
        {
          id: 178,
          slot: 1,
          name: 'Carta Andarilho Poluto'
        },
        {
          id: 179,
          slot: 2,
          name: 'Carta Andarilho Poluto'
        },
        {
          id: 179,
          slot: 3,
          name: 'Carta Andarilho Poluto'
        },
        {
          id: 179,
          slot: 4,
          name: 'Carta Andarilho Poluto'
        }
      ],
      currency: 'NAPs'
    };
    this.priceHistory = [
      {
        date: '28/01/2024',
        value: 120.5,
      },
      {
        date: '28/02/2024',
        value: 119.5,
      },
      {
        date: '28/03/2024',
        value: 154.5,
      },
    ],
    this._checkPriceStatus();
  }

  private _checkPriceStatus(): void {
    const priceHistoryLength = this.priceHistory.length;
    const lastPrice = this.priceHistory[priceHistoryLength - 1];
    const penultimatePrice =
      this.priceHistory[priceHistoryLength - 2];
    if (priceHistoryLength > 0 && lastPrice.value >= penultimatePrice.value) {
      this.risingPrice = true;
    } else if (
      priceHistoryLength > 0 &&
      lastPrice.value < penultimatePrice.value
    ) {
      this.risingPrice = false;
    } else {
      this.risingPrice = false;
    }
  }

  public goBack(): void {
    this._router.navigateByUrl('consult');
  }

  public openCardsDetails(): void {
    this.dialog.open(CardsDetailsComponent, {
      data: {
        cards: this.itemDetailData.cards
      }
    });
  }
}
