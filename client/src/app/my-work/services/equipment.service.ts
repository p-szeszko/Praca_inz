import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Weapon} from './weapon';
import {Accesory} from './accesory';
import {Item} from './item';
import { createInject } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  weaponsList: Weapon[] = [];
  itemsList: Item[] = [];
  accesoriesList: Accesory[] = [];

  constructor(private http: HttpClient ) { }

  getWeapons(id:string)
  {
    //const header = new HttpHeaders().set( 'Authorization', 'Bearer ' + token);
    const data={owner: id}
    console.log(id);
    return this.http.get<Weapon[]>('http://localhost:3000/api/getWeapons', {params:data}).pipe(catchError(this.handleError));
  }
  getItems(id:string)
  {
    const data={owner:id}
    //const header = new HttpHeaders().set( 'Authorization', 'Bearer ' + token);
    return this.http.get<Item[]>('http://localhost:3000/api/getItems', {params:data}).pipe(catchError(this.handleError));
  }
  getAccesories(id:string)
  {
    const data={owner:id}
    //const header = new HttpHeaders().set( 'Authorization', 'Bearer ' + token);
    return this.http.get<Accesory[]>('http://localhost:3000/api/getAccesories', {params:data}).pipe(catchError(this.handleError));
  }

  postWeapon(weapon:Weapon):Observable<any>
  {
    return this.http.post('http://localhost:3000/api/postWeapon',weapon).pipe(catchError(this.handleError));
  }
  putWeapon(weapon:Weapon):Observable<any>
  {
    return this.http.put('http://localhost:3000/api/putWeapon',weapon).pipe(catchError(this.handleError));
  }

  postItem(item:Item):Observable<any>
  {
    return this.http.post('http://localhost:3000/api/postItem', item).pipe(catchError(this.handleError));
  }
  putItem(item:Item):Observable<any>
  {
    return this.http.put('http://localhost:3000/api/putItem', item).pipe(catchError(this.handleError));
  }
  postAccesory(accesory: Accesory):Observable<any>
  {
    return this.http.post('http://localhost:3000/api/postAccesory', accesory).pipe(catchError(this.handleError));
  }
  putAccesory(accesory: Accesory):Observable<any>
  {
    return this.http.put('http://localhost:3000/api/putAccesory', accesory).pipe(catchError(this.handleError));
  }
  public handleError(er: HttpErrorResponse){
    return throwError(er);
  }
  deleteWeapon(id:string):Observable<any>
  {
    //const header = new HttpHeaders().set( 'Authorization', 'Bearer ' + token);
    const data={_id:id}
    //console.log(id);
    return this.http.delete('http://localhost:3000/api/deleteWeapon', {params:data}).pipe(catchError(this.handleError));
  }
  deleteItem(id:string):Observable<any>
  {
    const data={_id:id}
    //const header = new HttpHeaders().set( 'Authorization', 'Bearer ' + token);
    return this.http.delete('http://localhost:3000/api/deleteItem', {params:data}).pipe(catchError(this.handleError));
  }
  deleteAccesory(id:string):Observable<any>
  {
    const data={_id:id}
    //const header = new HttpHeaders().set( 'Authorization', 'Bearer ' + token);
    return this.http.delete('http://localhost:3000/api/deleteAccesory', {params:data}).pipe(catchError(this.handleError));
  }

  updateWeapon(weapon:Weapon){
    for(let i=0 ; i<this.weaponsList.length;i++)
    {
      if (this.weaponsList[i]._id===weapon._id)
      {
        this.weaponsList[i]=weapon;
      }
    }
  }
  updateItem(item: Item)
  {
    for(let i=0 ; i<this.itemsList.length;i++)
    {
      if (this.itemsList[i]._id===item._id)
      {
        this.itemsList[i]=item;
      }
    }
  }
  updateAccesory(accesory: Accesory)
  {
    for(let i=0 ; i<this.accesoriesList.length;i++)
    {
      if (this.accesoriesList[i]._id===accesory._id)
      {
        this.accesoriesList[i]=accesory;
      }
    }
  }


}
