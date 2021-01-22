import { Component } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-WishList';

  time = new Observable(observer =>{
    //cada segundo se observa
    setInterval(()=>observer.next(new Date().toString()),1000);
  })
}

//Rendereo diferido de HTML
