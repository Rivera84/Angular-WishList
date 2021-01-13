import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viajes.model';
import {destinosApiClient} from '../../models/destino-api-client.model'; 
@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  //destinos: DestinoViaje[];
  constructor(public destinosApiClient: destinosApiClient) {
    this.onItemAdded = new EventEmitter();
  }

  ngOnInit(): void {
  }

  /*
  guardar(nombre:string, url:string):boolean {
    this.destinos.push(new DestinoViaje(nombre, url));
    //console.log(new DestinoViaje(nombre,url));
    //console.log(this.destinos);
    return false;
  }*/
  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(e: DestinoViaje){
    //desmarcar todos los demas en en array de elegidos
    //this.destinos.forEach(function (x) {x.setSelected(false); });
    //se marca el elegido
    //d.setSelected(true);
    this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    e.setSelected(true);
  }

}
