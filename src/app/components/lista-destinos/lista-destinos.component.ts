import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  DestinoViaje
} from '../../models/destino-viajes.model';
import {
  destinosApiClient
} from '../../models/destino-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from 'src/app/models/destinos-viajes-state.model';
@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter < DestinoViaje > ;
  update:string[];
  all;
  //destinos: DestinoViaje[];


  constructor(public destinosApiClient: destinosApiClient, private store: Store<AppState>) {

    this.onItemAdded = new EventEmitter();
    this.update =[];
    this.store.select(state => state.destinos.favorito)
    .subscribe(d => {
      if(d != null){
        this.update.push("Se ha elegido a " + d.nombre);
      }
    });
    this.all = store.select(state => state.destinos.items).subscribe(items => this.all = items);

  }

  ngOnInit(): void {}

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

  elegido(e: DestinoViaje) {
    //desmarcar todos los demas en en array de elegidos
    //this.destinos.forEach(function (x) {x.setSelected(false); });
    //se marca el elegido
    //d.setSelected(true);
    /*
    this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    e.setSelected(true);
  */
    this.destinosApiClient.elegir(e);

  }

  getAll(){

  }

}
