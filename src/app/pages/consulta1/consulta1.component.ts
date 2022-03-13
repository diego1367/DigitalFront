import { Component, OnInit } from '@angular/core';
import { ConsultasApiService } from '../../shared/services';


@Component({
  selector: 'app-consulta1',
  templateUrl: './consulta1.component.html',
  styleUrls: ['./consulta1.component.scss']
})
export class Consulta1Component implements OnInit {
  dataSource: any;

  constructor(private Consultas: ConsultasApiService) { }

  ngOnInit(): void {
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
