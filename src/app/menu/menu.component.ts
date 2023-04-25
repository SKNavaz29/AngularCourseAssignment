import { Component, OnInit,Inject } from '@angular/core';
import {Dish} from '../shared/dish';
import { DishdetailsComponent } from '../dishdetails/dishdetails.component';
import {DISHES} from'../shared/dishes';
import { DishService } from '../services/dish.service';
import { flyInOut,expand } from '../animations/app.animation';
import { animate,  } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]

})
export class MenuComponent implements OnInit{

  dishes: Dish[];
  errMess: string;
  
  constructor(private dishService:DishService,
    @Inject('BaseURL') public BaseURL){

    

    

  }
  ngOnInit(){
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
}

}
