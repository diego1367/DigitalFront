import { Component, OnInit } from '@angular/core';
import { ConsultasApiService } from '../../shared/services';
@Component({
  selector: 'app-consulta3',
  templateUrl: './consulta3.component.html',
  styleUrls: ['./consulta3.component.scss']
})
export class Consulta3Component implements OnInit {
  dataSource: any;

  constructor(private Consultas: ConsultasApiService) { }

  ngOnInit() {
    let vSuscrip = this.Consultas.get("Procedimiento/GetConsulta3","")
      .subscribe(resp => {
        this.dataSource = resp;
        vSuscrip.unsubscribe();
      },
        error => {
          console.log(error);
          vSuscrip.unsubscribe();
        });
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
