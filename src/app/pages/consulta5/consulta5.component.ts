import { Component, OnInit } from '@angular/core';
import { ConsultasApiService } from '../../shared/services';

@Component({
  selector: 'app-consulta5',
  templateUrl: './consulta5.component.html',
  styleUrls: ['./consulta5.component.scss']
})
export class Consulta5Component implements OnInit {
  dataSource: any;

  constructor(private Consultas: ConsultasApiService) { }

  ngOnInit() {
    let vSuscrip = this.Consultas.get("Procedimiento/GetConsulta5","")
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
