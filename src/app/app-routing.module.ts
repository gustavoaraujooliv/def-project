import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { ConsultItemsComponent } from "./components/consult-items/consult-items.component";
import { ItemDetailsComponent } from "./components/item-details/item-details.component";

const ROUTES: Routes = [
    { 
      path: '', 
      component: HomePageComponent,
      children: [
        { path: '', redirectTo: 'consult', pathMatch: 'full' },
        { path: 'consult', component: ConsultItemsComponent },
        { path: 'item-detail/:id', component: ItemDetailsComponent }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule {}