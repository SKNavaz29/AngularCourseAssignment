import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import {Observable,of} from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
    private ProcessHTTPMsgService:ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(baseURL+'promotions')
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getPromotion(id:number):  Observable<Promotion>{
    return this.http.get<Promotion>(baseURL+'promotions/'+id)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(PROMOTIONS => PROMOTIONS[0]))
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getPromotionIds(): Observable<number[] | any> {
    return this.getPromotions().pipe(map(PROMOTIONS => PROMOTIONS.map(Promotion => Promotion.id)))
      .pipe(catchError(error => error));
  }
  putDish(promotion: Promotion): Observable<Promotion> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Promotion>(baseURL + 'promotions/' + promotion.id, promotion, httpOptions)
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));

  }

}
