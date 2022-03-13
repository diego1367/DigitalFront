import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Consulta1Component } from './pages/consulta1/consulta1.component';
import { Consulta2Component } from './pages/Consulta2/Consulta2.component';
import { Consulta3Component } from './pages/Consulta3/Consulta3.component';
import { Consulta4Component } from './pages/Consulta4/Consulta4.component';
import { Consulta5Component } from './pages/Consulta5/Consulta5.component';
import { ClientesComponent } from './pages/Clientes/Clientes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { VentasFacturacionComponent } from './pages/ventas-facturacion/ventas-facturacion.component';
import { DxDataGridModule, DxFormModule, DxSelectBoxModule, DxNumberBoxModule, DxDateBoxModule, DxPopupModule } from 'devextreme-angular';

const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: 'ventas-facturacion',
    component: VentasFacturacionComponent,
  },
  {
    path: 'consulta1',
    component: Consulta1Component,
  },
  {
    path: 'consulta2',
    component: Consulta2Component,
  },
  {
    path: 'consulta3',
    component: Consulta3Component,
  },
  {
    path: 'consulta4',
    component: Consulta4Component,
  },
  {
    path: 'consulta5',
    component: Consulta5Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule, DxSelectBoxModule, DxNumberBoxModule, DxDateBoxModule, DxPopupModule],
  providers: [],
  exports: [RouterModule, DxDataGridModule, DxFormModule, DxSelectBoxModule, DxNumberBoxModule, DxDateBoxModule, DxPopupModule],
  declarations: [ ProductosComponent, ClientesComponent, VentasFacturacionComponent, Consulta1Component, Consulta2Component, Consulta3Component, Consulta4Component, Consulta5Component ]
})
export class AppRoutingModule { }
