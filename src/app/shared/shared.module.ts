import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";

import {HeaderComponent} from "./components/header/header.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
  ],
  exports: [
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class SharedModule { }
