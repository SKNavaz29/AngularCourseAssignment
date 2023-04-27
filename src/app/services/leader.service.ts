import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { leader } from '../shared/leader';
import {Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private ProcessHTTPMsgService:ProcessHTTPMsgService)  { }


  getLeaders(): Observable<leader[]> {
    return this.http.get<leader[]>(baseURL + 'leaders')
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getLeader(id:number):  Observable<leader>{
    return this.http.get<leader>(baseURL + 'leaders/' + id)
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));

  }
  getFeaturedLeader():  Observable<leader>{
    return this.http.get<leader[]>(baseURL + 'leaders?featured=true').pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
    }
    
    getLeaderIds(): Observable<number[] | any> {
      return this.getLeaders().pipe(map(leaders =>leaders.map(leader => leader.id)))
        .pipe(catchError(error => error));
    }

    putDish(leader: leader): Observable<leader> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.http.put<leader>(baseURL + 'leaders/' + leader.id, leader, httpOptions)
        .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  
    }


  }
