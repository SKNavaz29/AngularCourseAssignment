import { Component, OnInit } from '@angular/core';
import { leader } from '../shared/leader';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LeaderService } from '../services/leader.service';
import { LEADERS } from '../shared/leaders';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  Leaders: leader[];
  leader!: leader;
  constructor(private LeaderService: LeaderService,private route:ActivatedRoute, private location:Location) { }
ngOnInit() {
  this.LeaderService.getLeaders()
  .subscribe(Leaders => this.Leaders = Leaders);
}

goBack():void{
  this.location.back();
}
}