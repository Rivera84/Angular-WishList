import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { DestinoViaje } from '../../models/destino-viajes.model';
@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  
  @Output() onItemAdded: EventEmitter<DestinoViaje>
  fg: FormGroup;
  minLongitud= 3;
  searchResults: string[];

  constructor(fb: FormBuilder) { 
    this.onItemAdded =  new EventEmitter();
    this.fg = fb.group({
      nombre:['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url:['']
    });
    this.fg.valueChanges.subscribe((form:any)=>{
      console.log('cambio en el formulario', form)
    })
  }

  ngOnInit(): void {
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input') //escucha(observable) cada vez que se toca una tecla en el input
    //pipe sirve para hacer operaciones en serie
    .pipe(
      map((e: KeyboardEvent)=> (e.target as HTMLInputElement).value),
      filter(text => text.length >2),
      debounceTime(200),
      distinctUntilChanged(), //revisa hasta que haya un cambio en el string
      switchMap(()=> ajax('../../assets/datos.json'))
    ).subscribe(ajaxResponse => {
      console.log(ajaxResponse.response);
      this.searchResults = ajaxResponse.response;
    });
  }

  guardar(nombre:string, url: string):boolean{
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false
  }

  nombreValidator(control: FormControl): {[s:string]: boolean}{
    const l = control.value.toString().trim().length;
    console.log(l);
    if(l>0 && l<5){
      return { invalidNombre: true};
    }
    return null;
  }

  //Validador parametrizado
  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): {[s:string]: boolean} | null => {
      const l = control.value.toString().trim().length;
      if(l>0 && l<minLong){
        return { minLongNombre: true};
      }
      return null;
    }
  }

}
