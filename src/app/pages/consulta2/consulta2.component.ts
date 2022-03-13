import { Component, OnInit } from '@angular/core';
import { ConsultasApiService } from '../../shared/services';

@Component({
  selector: 'app-consulta2',
  templateUrl: './consulta2.component.html',
  styleUrls: ['./consulta2.component.scss']
})
export class Consulta2Component implements OnInit {
  dataSource: any;

  constructor(private Consultas: ConsultasApiService) { }

  ngOnInit(): void {
    let vSuscrip = this.Consultas.get("Procedimiento/GetConsulta2","")
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
