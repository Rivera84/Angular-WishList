import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppState } from '../app.module';
import { DestinoViaje } from './destino-viajes.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state.model';

@Injectable()
export class destinosApiClient {

	//current: Subject<DestinoViaje> = new BehaviorSubject<DestinoViaje>(null); Se pasa el valor por defecto
	constructor(private store: Store<AppState>) {
	}

	add(d:DestinoViaje){
	  this.store.dispatch(new NuevoDestinoAction(d));
	}
	elegir(d: DestinoViaje){
		this.store.dispatch(new ElegidoFavoritoAction(d));
	}

}