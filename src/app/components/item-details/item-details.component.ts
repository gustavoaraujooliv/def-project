import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent implements OnInit {

  constructor(
    private _router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._router.params.subscribe(
      (value) => {
        console.log(value['id']);
      }
    )
  }
}
