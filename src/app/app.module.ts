import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ItemsTableComponent } from './components/items-table/items-table.component';
import { MatTableModule } from '@angular/material/table';
import { ConsultItemsComponent } from './components/consult-items/consult-items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { CurrencyPipe } from '@angular/common';
import { ItemDetailChartComponent } from './components/item-detail-chart/item-detail-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CardsDetailsComponent } from './components/cards-details/cards-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    SearchFormComponent,
    ItemsTableComponent,
    ConsultItemsComponent,
    ItemDetailsComponent,
    ItemDetailChartComponent,
    CardsDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    NgxChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatExpansionModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatListModule,
    ScrollingModule
  ],
  providers: [provideAnimationsAsync(), CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
