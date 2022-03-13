import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { Dialogo, eDialogoBotones, eDialogoIcono, eDialogoResultado, obtenerOidMinimo } from '../../shared/Dialogo';
import { ConsultasApiService } from '../../shared/services';


@Component({
  selector: 'app-ventas-facturacion',
  templateUrl: './ventas-facturacion.component.html',
  styleUrls: ['./ventas-facturacion.component.scss']
})
export class VentasFacturacionComponent implements OnInit {
  @ViewChild(DxFormComponent) formMain: DxFormComponent;
  entidad: {
    id?: any,
    nombreCliente?: any,
    apellidoCliente?: any,
    tipoDocumento?: any,
    cedula?: any,
    numeroCelular?: any,
    fechaNacimiento?: any,
    cliente: any;
  };
  dataSource: {
    idVentas?: any,
    idClientes?: any,
    idProductos?: any,
    cantidadVenta?: any,
    fecha?: any,
  };
  listado: any;
  Select: any;
  Productos: any;
  habilitar: boolean;
  CantidadVenta: any;
  fecha: Date;
  constructor(private Consultas: ConsultasApiService) { }

  ngOnInit(): void {
    this.entidad = {
      id: null,
      nombreCliente: null,
      apellidoCliente: null,
      tipoDocumento: null,
      cedula: null,
      numeroCelular: null,
      fechaNacimiento: null,
      cliente: null,
    };
    this.CantidadVenta = null;
    this.dataSource = {
      idVentas: 0,
      idClientes: null,
      idProductos: null,
      fecha: null,
      //Productos:[],
      cantidadVenta: null,
    };
    this.fecha = null;
    this.listado = [];
    this.habilitar = true;
    let vSuscrip = this.Consultas.get("Ophelia/GetProductos","")
      .subscribe(resp => {
        this.Productos = resp;
        vSuscrip.unsubscribe();
      },
        error => {
          console.log(error);
          vSuscrip.unsubscribe();
        });
  }

  btnBuscar_Click = (e) => {
    if (this.formMain.instance.validate().isValid) {
      let vSuscrip = this.Consultas.get("Ophelia/GetCliente",this.entidad.id)
        .subscribe(resp => {
          if (resp) {
            this.entidad.cliente = resp;
            this.entidad.id = this.entidad.cliente.id;
            this.entidad.nombreCliente = this.entidad.cliente.nombreCliente;
            this.entidad.apellidoCliente = this.entidad.cliente.apellidoCliente;
            this.entidad.numeroCelular = this.entidad.cliente.numeroCelular;
            this.habilitar = false;
          }
          else {
            Dialogo.mostrarDialogo('El número de identificación no existe', eDialogoBotones.ok, eDialogoIcono.advertencia);

          }
          vSuscrip.unsubscribe();
        },
          error => {
            console.log(error);
            vSuscrip.unsubscribe();
          });
    }
  }
  btnAgregar_Click = (e) => {
    if (this.formMain.instance.validate().isValid) {
      this.Productos.forEach(element => {
        if (element.id == this.Select)
          this.dataSource.idProductos = element;
      });
      this.dataSource.idVentas = obtenerOidMinimo(this.listado);
      this.dataSource.cantidadVenta = this.CantidadVenta;
      this.dataSource.idClientes = this.entidad.cliente;
      this.dataSource.fecha = this.fecha;
      if (this.CantidadVenta < this.dataSource.idProductos.cantidadInventario && this.SumaValidacion(this.CantidadVenta, this.dataSource.idProductos.cantidadInventario) >= 5) {
        let vSuscrip = this.Consultas.post("Procedimiento/AgregarVentas",this.dataSource)
          .subscribe(resp => {
            console.log(resp);
            vSuscrip.unsubscribe();
          },
            error => {
              console.log(error);
              vSuscrip.unsubscribe();
            });
        this.listado.push(this.dataSource);
        this.dataSource = {
          idVentas: 0,
          idClientes: null,
          idProductos: null,
          cantidadVenta: null,
          fecha: null,
        };
        this.Select = null;
        this.CantidadVenta = null;
      } else {

        if (this.CantidadVenta > this.dataSource.idProductos.cantidadInventario)
          Dialogo.mostrarDialogo('La cantidad de venta Supera la cantidad de inventario', eDialogoBotones.ok, eDialogoIcono.advertencia);
        else if (this.SumaValidacion(this.CantidadVenta, this.dataSource.idProductos.cantidadInventario) <= 5)
          Dialogo.mostrarDialogo('La cantidad de venta Supera el minimo permitido de inventario', eDialogoBotones.ok, eDialogoIcono.advertencia);
      }
    }
  }
  SumaValidacion(Numero1: any, Numero2: any) {
    var resultado = Numero2 - Numero1;
    return resultado;
  }
}
