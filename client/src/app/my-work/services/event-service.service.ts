import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {EventASG} from './event';
@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  public eventsList: EventASG[];
  public eventsListSearch: EventASG[];
  public eventsListPaginator: EventASG[] = [];
  public forMarkers:Observable<EventASG[]>;
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

  public  getEvents(){
  const x =  this.http.get<EventASG[]>('http://localhost:3000/api/event');
  return x;
  }
}


