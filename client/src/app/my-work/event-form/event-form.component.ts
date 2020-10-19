import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {fractionsSnackBarComponent} from '../Snackbars/fractions.component';
import * as olProj from 'ol/proj';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class EventFormComponent implements OnInit{
  @Input() wsp: string;
   coord;
  myFormInfo: FormGroup;
  FormFractions: FormGroup;
  myFormLimits: FormGroup;
  myFormDescirption: FormGroup;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {

   }

  ngOnInit(): void {
    this.myFormInfo = this.fb.group({
      nazwa: ['', Validators.required],
      miejsce: ['', Validators.required],
      termin: [ '', Validators.required],
      rodzaj: ['', Validators.required],
      wspe: ['', Validators.required],
      oplata: Number,
  });

    this.FormFractions = this.fb.group({
      frakcje:this.fb.array([this.fb.group({strona:'',wielkosc:''})])
    });
    this.myFormLimits = this.fb.group({
      limity:this.fb.array([this.fb.group({limit:0}),this.fb.group({limit:0}),this.fb.group({limit:0}),this.fb.group({limit:0}),this.fb.group({limit:0})])
    });
    this.myFormDescirption=this.fb.group({
      opis: ['',Validators.required]
    });

  }

  public coorChange()
  {
    if (this.wsp !== ''){
    let coor =olProj.transform(this.wsp, 'EPSG:3857', 'EPSG:4326');
    var coorDigital=[];
    coorDigital[0]=Number(coor[0]).toFixed(2);
    coorDigital[1]=Number(coor[1]).toFixed(2);
    this.myFormInfo.patchValue({wspe:coorDigital});

    }
    else
    {
    this.coord = '';

    return '';
  }
  }
  get limity(){
    return this.myFormLimits.get('limity') as FormArray
  }
  get frakcjeForm(){
    return this.FormFractions.get('frakcje') as FormArray
  }
  addFraction(){
    const faction=this.fb.group({
      strona:'',
      wielkosc:''
    })
    this.frakcjeForm.push(faction);
  }
  deleteFraction(i){
    if(this.frakcjeForm.value.length==1)
    {
      this.snackBar.openFromComponent(fractionsSnackBarComponent, { duration: 5000,
        horizontalPosition: "center", verticalPosition: "top"})
    }
    else
    this.frakcjeForm.removeAt(i);
  }


}
