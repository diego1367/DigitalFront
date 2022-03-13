import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { ConsultasApiService } from '../../shared/services';
import { Dialogo, eDialogoBotones, eDialogoIcono, eDialogoResultado } from '../../shared/Dialogo';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  @ViewChild(DxFormComponent) form: DxFormComponent;
  @ViewChild(DxFormComponent) formMain: DxFormComponent;

  popupVisible: boolean;
  dataSource: any;
  entidad: {
    id?: any,
    nombreProducto?: any,
    cantidadInventario?: any,
    precioProducto?: any,
  };
  entidadModificacion: {
    id?: any,
    nombreProducto?: any,
    cantidadInventario?: any,
    precioProducto?: any,
  };
  constructor(private Consultas: ConsultasApiService,) { }

  ngOnInit() {
    this.popupVisible = false;
    this.iniciarRegistro();
    this.actualizardata();
  }
  btnAgregar_Click = (e) => {
    if (this.formMain.instance.validate().isValid) {
      let vSuscrip = this.Consultas.post("Ophelia/AgregarProducto",this.entidad)
        .subscribe(resp => {
          var a = resp;
          this.dataSource.push(resp);
          vSuscrip.unsubscribe();
        },
          error => {
            console.log(error);
            vSuscrip.unsubscribe();
          });
      this.iniciarRegistro();
    }
  }

  eliminarClick = (e) => {
    Dialogo.mostrarDialogo('¿Desea eliminar el registro seleccionado?', eDialogoBotones.siNo, eDialogoIcono.pregunta)
      .then(resp => {
        if (resp == eDialogoResultado.si) {
          let vSuscrip = this.Consultas.delete("Ophelia/EliminarProducto",e.row.key)
            .subscribe(resp => {
              var indexEliminar = this.dataSource.findIndex(element => element.id == resp);
              if (indexEliminar >= 0) {
                this.dataSource.splice(indexEliminar, 1);
              }
              vSuscrip.unsubscribe();
            },
              error => {
                console.log(error);
                vSuscrip.unsubscribe();
              });
        }
      });
  }
  modificarClick = (e) => {
    this.popupVisible = true;
  }
  iniciarRegistro() {
    this.entidad = {
      id: 0,
      nombreProducto: null,
      cantidadInventario: null,
      precioProducto: null,
    }
  }
  onFocusedRowChanged(e) {
    this.entidadModificacion = {
      id: 0,
      nombreProducto: null,
      cantidadInventario: null,
      precioProducto: null,
    }
    var rowData = e.row && e.row.data;
    if (rowData) {
      this.entidadModificacion = Object.assign({}, rowData);
    }
  }
  btnGrabar_Click = (e) => {
    let vSuscrip = this.Consultas.put("Ophelia/ActualizarProducto",this.entidadModificacion)
      .subscribe(resp => {
        var a = resp;
        this.popupVisible = false;
        this.actualizardata();
        vSuscrip.unsubscribe();
      },
        error => {
          console.log(error);
          vSuscrip.unsubscribe();
        });
  }
  actualizardata() {
    this.dataSource = null;
    let vSuscrip = this.Consultas.get("Ophelia/GetProductos","")
      .subscribe(resp => {
        this.dataSource = resp;
        vSuscrip.unsubscribe();
      },
        error => {
          console.log(error);
          vSuscrip.unsubscribe();
        });
  }
}
