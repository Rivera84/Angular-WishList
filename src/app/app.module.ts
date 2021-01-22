import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {StoreModule as NgRxStoreModule, ActionReducerMap} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component'; //Formularios interactivos
import { destinosApiClient } from './models/destino-api-client.model';
import { DestinosViajesState, reducerDestinosViajes, intializeDestinosViajesState, DestinosViajesEffects } from './models/destinos-viajes-state.model';


//Rutas de la SPA
const routes: Routes = [
  {path: '',redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ListaDestinosComponent},
  {path: 'destino', component: DestinoDetalleComponent}
]

// Redux init
//Estado global
export interface AppState {
  destinos: DestinosViajesState
}

//reducers global
const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

// inicializacion de la app
let reducersInicialStates = {
  destinos: intializeDestinosViajesState()
};
//redux fin init

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, {
      initialState: reducersInicialStates,
      runtimeChecks:{
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot([DestinosViajesEffects]),
    StoreDevtoolsModule.instrument(/*{ maxAge: 5 //Cuantos cambios de estado procesados}*/)
  ],
  providers: [destinosApiClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
