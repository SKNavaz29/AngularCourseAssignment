import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { feedback, ContactType } from '../shared/feedback';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  feedbackForm: FormGroup;
  feedback: feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;
  formErrors={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':'',

  };

  validationMessages={
    'firstname':{
      'required':'First name is Required.',
      'minlength':'First must be atleast 2 characters long',
      'maxlength':'First name cannot be more than 25 characters',
    },
    'lastname':{
      'required':'Last name is Required.',
      'minlength':'Last must be at least 2 characters long',
      'maxlength':'Last name cannot be more than 25 characters',
    },
    'telnum':{
      'required': 'Tel. numbers is required',
      'pattern' : 'Tel. number must contain only numbers'  

    },

    'email':{
      'required': 'Email is required',
      'email' : 'Email not in valid format.'  
    }
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required,Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data=>this.onValueChanged(data));

    this.onValueChanged();

  }

  onValueChanged(data?:any){
    if(!this.feedbackForm){return;}
    const form =this.feedbackForm;
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
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }
}
