import { Component, OnInit } from '@angular/core';
import { leader } from '../shared/leader';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LeaderService } from '../services/leader.service';
import { LEADERS } from '../shared/leaders';
import { flyInOut,expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),

    ]
})
export class AboutComponent implements OnInit {
  Leaders: leader[];
  leader: leader;
  
  constructor(private LeaderService: LeaderService,private route:ActivatedRoute, private location:Location) { 
    
  }

  

ngOnInit() {
  this.LeaderService.getLeaders()
  .subscribe(Leaders => this.Leaders = Leaders);
}

goBack():void{
  this.location.back();
}
}