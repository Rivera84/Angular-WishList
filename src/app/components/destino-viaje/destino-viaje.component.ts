import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { VoteDownAction, VoteUpAction } from 'src/app/models/destinos-viajes-state.model';
import { DestinoViaje } from '../../models/destino-viajes.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: DestinoViaje;
  @Input() position: number; //@Input('idx) --> sirve para renombrar las variables si es necesario
  @HostBinding('attr.class') cssClass = 'col-md-4'//tener una vinculacion directa de un string de nuestro componente a un atributo del tag con el que se envuelve el contenido
  @Output() clicked: EventEmitter<DestinoViaje>;

  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
   }

  ngOnInit(): void {
  }

  ir():boolean{
    this.clicked.emit(this.destino)
    return false
  }

  voteUp(){
    this.store.dispatch(new VoteUpAction(this.destino));
    return false
  }
  voteDown(){
    this.store.dispatch(new VoteDownAction(this.destino));
    return false
  }

}
