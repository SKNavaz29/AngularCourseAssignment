import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { Dish} from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comments';
import { NgForm } from '@angular/forms';
import { baseURL } from '../shared/baseurl';
import {trigger, state,style,animate,transition, animation} from '@angular/animations';
import { visibility } from '../animations/app.animation';
import { flyInOut,expand } from '../animations/app.animation';


@Component({
  selector: 'app-dishdetails',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.scss'],
  
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations:[
    visibility(),
    flyInOut(),
    expand()
  ]
})
export class DishdetailsComponent implements OnInit {
    
    dish: Dish;
    dishIds:string[];
    prev:string;
    next:string;
    comment:Comment;
    commentForm:FormGroup;
    errmess:String;
    dishcopy:Dish;
    visibility = 'shown';




    constructor(private dishService: DishService,private fb: FormBuilder, private route:ActivatedRoute, private location:Location,
      @Inject('BaseURL') public BaseURL) {
      this.createForm();
     }


     
     
    @ViewChild('fform') commentFormDirective;
    formErrors={
      'author':'',

      'comment':'',
    };
  
    ngOnInit() {
      this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params
      .pipe(switchMap((params: Params) => {this.visibility = 'hidden'; return this.dishService.getDish(params['id'])}))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility='shown' },
        errmess => this.errmess = <any>errmess );
    }

    setPrevNext(dishId: string) {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    goBack():void{
      this.location.back();

    }
 

    validationMessages={
    'author':{
      'required':'Author name is Required.',
      'minlength':'First must be atleast 2 characters long',
    },
    'comment':{
      'required':'Comment is Required.',
    }
    };
    


    createForm() {
      this.commentForm = this.fb.group({
        author: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
        rating:[''],
        comment: ['', [Validators.required,]],
        

      });

 

  
      this.commentForm.valueChanges
      .subscribe(data=>this.onValueChanged(data));
  
      this.onValueChanged();
    
    }
  
    onValueChanged(data?:any){
      if(!this.commentForm){return;}
      const form =this.commentForm;
      for (const field in this.formErrors){
        if(this.formErrors.hasOwnProperty(field)){
          this.formErrors[field]='';
          const control=form.get(field);
          if(control && control.dirty && !control.valid){
            const messages = this.validationMessages[field];
            for (const key in control.errors){
              if(control.errors.hasOwnProperty(key)){
                this.formErrors[field] +=messages[key]+'';
              }
            }
          }
        }
      }
    }


   onSubmit() {
      this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errmess = <any>errmess; });
    console.log(this.comment);
      this.commentForm.reset({
        author: '',
        rating:'',
        comment: '',
      });
    

      this.commentFormDirective.resetForm();
    }

  }




