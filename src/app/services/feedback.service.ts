import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { feedback,ContactType } from '../shared/feedback';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpSentEvent } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

       constructor(private http: HttpClient, private processHTTPMsgService: ProcessHTTPMsgService ) { }
       submitFeedback(feedback : feedback):Observable<feedback>{
        const httpOptions = {
          headers: new HttpHeaders({ "Content-Type": "application/json"  }),
        };
         return this.http.post<feedback>((baseURL + 'feedback/'), feedback, httpOptions)
         .pipe(
           catchError(this.processHTTPMsgService.handleError)
           
            );

  }
}
