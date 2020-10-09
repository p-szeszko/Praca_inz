import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      nazwa: '',
      miejsce: '',
      data: '',
      rodzaj:'',
      limity: this.fb.array([5]),
      frakcje:this.fb.array([this.fb.group({strona:'',wielkosc:''}),this.fb.group({strona:'', wielkosc:''})]),
      opis:''
  });

    this.myForm.valueChanges.subscribe(console.log);

  }
  get limity(){
    return this.myForm.get('limity') as FormArray
  }
  get frakcjeForm(){
    return this.myForm.get('frakcje') as FormArray
  }
  addFraction(){
    const faction=this.fb.group({
      strona:'',
      wielkosc:''
    })
    this.frakcjeForm.push(faction);
  }
  deleteFraction(i){
    this.frakcjeForm.removeAt(i);
  }


}
