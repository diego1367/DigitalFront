import { Component, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { ConsultasApiService } from '../../shared/services';
import { Dialogo, eDialogoBotones, eDialogoIcono, eDialogoResultado } from '../../shared/Dialogo';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  @ViewChild(DxFormComponent) formMain: DxFormComponent;

  dataSource: any;
  entidad: {
    id?: any,
    nombreCliente?: any,
    apellidoCliente?: any,
    tipoDocumento?: any,
    cedula?: any,
    numeroCelular?: any,
    fechaNacimiento?: any,
  };
  constructor(private Consultas: ConsultasApiService) { }

  ngOnInit() {
    this.iniciarRegistro();
    let vSuscrip = this.Consultas.get("Ophelia/GetClientes","")
      .subscribe(resp => {
        this.dataSource = resp;
        vSuscrip.unsubscribe();
      },
        error => {
          console.log(error);
          vSuscrip.unsubscribe();
        });
  }

  btnAgregar_Click = (e) => {
    if (this.formMain.instance.validate().isValid) {
      let vSuscrip = this.Consultas.post("Ophelia/AgregarCliente",this.entidad)
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
          let vSuscrip = this.Consultas.delete("Ophelia/EliminarCliente",e.row.key)
            .subscribe(resp => {
              var a = resp;
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
  iniciarRegistro() {
    this.entidad = {
      id: 0,
      nombreCliente: null,
      apellidoCliente: null,
      tipoDocumento: null,
      cedula: null,
      numeroCelular: null,
      fechaNacimiento: null,
    }
  }
  getValue(rowData) {
    const column = this as any;
    var a = column.defaultCalculateCellValue(rowData);
    if (a == 1)
      return 'Nit';
    else if (a == 2)
      return 'C.C';
    else if (a == 3)
      return 'T.E';
  }
}
