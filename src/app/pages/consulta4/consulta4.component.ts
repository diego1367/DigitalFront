import { Component, OnInit } from '@angular/core';
import { ConsultasApiService } from '../../shared/services';

@Component({
  selector: 'app-consulta4',
  templateUrl: './consulta4.component.html',
  styleUrls: ['./consulta4.component.scss']
})
export class Consulta4Component implements OnInit {
  dataSource: any;

  constructor(private Consultas: ConsultasApiService) { }

  ngOnInit() {
    let vSuscrip = this.Consultas.get("Procedimiento/GetConsulta4","")
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
