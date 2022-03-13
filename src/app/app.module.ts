import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule } from './shared/components';
import {  ScreenService, ConsultasApiService } from './shared/services';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { VentasFacturacionComponent } from './pages/ventas-facturacion/ventas-facturacion.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ ScreenService, ConsultasApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
