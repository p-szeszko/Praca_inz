import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {EventASG} from './event';
import { IfStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  public eventsList: EventASG[] = [];
  public eventsListSearch: EventASG[] = [];
  public eventsListPaginator: EventASG[] = [];
  public userEvents: EventASG[] = [];
  public userEventsPaginator: EventASG[] = [];
  public eventToEdit: EventASG = null;
  constructor(private http: HttpClient) {


  }

  public setPaginatorList(index: number)
  {
    this.eventsListPaginator=[];
    if ((index + 1) * 10 > this.eventsListSearch.length)
    {
      for (let i = index * 10; i < this.eventsListSearch.length; i++)
      {
        this.eventsListPaginator.push(this.eventsListSearch[i]);
      }
    }
    else{
      for (let i = index * 10; i < (index + 1) * 10; i++)
      {
        this.eventsListPaginator.push(this.eventsListSearch[i]);
      }
    }
  }
  public  joinFraction(event:string, faction:string, user:string, name:string):Observable<any>
  {
    const options = {_id:event, strona:faction, _idGracz:user, gracz:name}
    const header = new Headers();
    header.append('Content-Type','application/json; charset=utf-8');
    console.log(options);
    return this.http.put('http://localhost:3000/api/signUser',{headers: header, params: options})
     .pipe(
       catchError(this.handleError)
     );
  }
  public leaveFraction(event:string, player:string):Observable<any>{
    const data= {_id:event, gracz: player};
    return this.http.put('http://localhost:3000/api/unsignUser',data ).pipe(catchError(this.handleError));
  }

  public addPlayerInClient(event: string, side:string, _idGracz: string, name: string)
  {
    for(let ev of this.eventsList){
      if (ev._id===event)
      {
        for(let fraction of ev.frakcje)
        {
          if(fraction.strona===side)
          {
            fraction.zapisani.push({_id:_idGracz, imie: name});
          }
        }
      }
    }
  }

  public deletePlayerInClient(event: string, side:string, _idGracz: string)
  {
    for(let ev of this.eventsList){
      if (ev._id===event)
      {
        for(let fraction of ev.frakcje)
        {
          if(fraction.strona===side)
          {
            fraction.zapisani.forEach((item,index)=>{
              if(item._id===_idGracz) fraction.zapisani.splice(index,1);
            })
          }
        }
      }
    }
  }
  public postEvent(event: EventASG):Observable<any>
  {

    return this.http.post('http://localhost:3000/api/event', event ).pipe(catchError(this.handleError));
  }

  public updateEvent(event: EventASG):Observable<any>
  {
    return this.http.put('http://localhost:3000/api/updateEvent', event).pipe(catchError(this.handleError));
  }
  public  getEvents(){
  const x =  this.http.get<EventASG[]>('http://localhost:3000/api/event').pipe(catchError(this.handleError));
  return x;
  }
  public handleError(er:HttpErrorResponse){
    return throwError('Something went wrong, try again');
  }
  public addEventInClient(event: EventASG)
  {
    this.eventsList.push(event);
    this.setPaginatorList(0);
  }

  public fillUsersEvents(user_id: string)
  {
    for(let ev of this.eventsList){

      if(ev.organizator._id===user_id)
      {
        this.userEvents.push(ev);
      }
      else{
        for(let fraction of ev.frakcje)
        {

            for(let player of fraction.zapisani)
            {
              if(player._id === user_id)
              {
                this.userEvents.push(ev);
              }
            }
        }
      }
    }
  }

  public setPaginatorUsersEvents(index: number)
  {
    this.userEventsPaginator=[];
    if ((index + 1) * 10 > this.userEvents.length)
    {
      for (let i = index * 10; i < this.userEvents.length; i++)
      {
        this.userEventsPaginator.push(this.userEvents[i]);
      }
    }
    else{
      for (let i = index * 10; i < (index + 1) * 10; i++)
      {
        this.userEventsPaginator.push(this.userEvents[i]);
      }
    }
  }

}


