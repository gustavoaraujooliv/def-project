import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { IPriceData } from '../../interfaces/price-data.interface';

@Component({
  selector: 'app-item-detail-chart',
  templateUrl: './item-detail-chart.component.html',
  styleUrl: './item-detail-chart.component.scss',
})
export class ItemDetailChartComponent implements OnInit {
  @Input() priceHistoryData!: Array<IPriceData>;
  @Input() private _itemName!: string;
  public dateArray: Array<string> = [];
  public valueArray: Array<number> = [];
  public chartOptions!: EChartsOption;
  public isLoading = true;
  public loadingOpts = {
    text: 'Loading...',
    color: '#D2B48C',
    textColor: '#000',
  };

  ngOnInit(): void {
    this._prepareChartData();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.chartOptions = {
      title: {
        text: `Histórico de preços - ${this._itemName}`,
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: this.dateArray,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.valueArray,
          type: 'line',
          itemStyle: {
            color: '#D2B48C',
          },
        },
      ],
    };
  }

  private _prepareChartData(): void {
    this.priceHistoryData.forEach((priceData) => {
      console.log(priceData);
      this.dateArray?.push(priceData.date);
      this.valueArray?.push(priceData.value);
    });
  }
}
