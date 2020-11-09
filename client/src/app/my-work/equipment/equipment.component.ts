import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Accesory } from '../services/accesory';
import { EquipmentService } from '../services/equipment.service';
import { Item } from '../services/item';
import { LoginService } from '../services/login.service';
import { Weapon } from '../services/weapon';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, AfterViewInit {
  weaponForm: FormGroup;
  itemForm: FormGroup;
  accesoryForm: FormGroup;
  showNewW:boolean = null;
  showNewI:boolean = null;
  showNewA:boolean = null;
  selectedWeapon: Weapon;
  selectedItem: Item;
  selectedAccesory: Accesory;
  @ViewChild('weapon', {static: false}) inputEl:ElementRef;

  constructor(private loginS: LoginService, public eqS: EquipmentService, private fb: FormBuilder, private route: ActivatedRoute ) {

   }
  ngAfterViewInit(): void {
   setTimeout(() =>{ if(this.loginS.logged===true){
      console.log('Mudafucka');
      console.log(this.loginS.user);
      this.eqS.getWeapons(this.loginS.user.userID).pipe(first()).subscribe(weapons=>{
        this.eqS.weaponsList=weapons;
    });
      this.eqS.getItems(this.loginS.user.userID).pipe(first()).subscribe(items=>{
      this.eqS.itemsList = items;
    });

      this.eqS.getAccesories(this.loginS.user.userID).pipe(first()).subscribe(accesories=>{
      this.eqS.accesoriesList = accesories;
    });
  }
  },
   100);
  }

  ngOnInit(): void {
    this.weaponForm = this.fb.group({
      nazwa: ['', Validators.required],
      rodzaj:['', Validators.required],
      fps:['', Validators.required],
      rof: '',
      skuteczny:'',
      opis:''
    });
    this.itemForm= this.fb.group({
      nazwa: ['', Validators.required],
      kamo:'',
      rodzaj: ['', Validators.required],
      opis:'',
    });
    this.accesoryForm=this.fb.group({
      nazwa: ['', Validators.required],
      rodzaj: ['', Validators.required],
      opis: ''
    });
  }
  addWeapon(){
    this.showNewW=true;
    this.showNewI=null;
    this.showNewA=null;
    setTimeout(() => this.inputEl.nativeElement.focus(), 30);
  }
  addItem(){
    this.showNewI=true;
    this.showNewW=null;
    this.showNewA=null;
  }
  addAccesory(){
    this.showNewA=true;
    this.showNewW=null;
    this.showNewI=null;
  }

  submitNewWeapon(){
    if(this.weaponForm.valid===true){
     let newWeapon: Weapon = {
        _id:'',
        owner:  this.loginS.user.userID,
        nazwa: this.weaponForm.value.nazwa,
        rodzaj: this.weaponForm.value.rodzaj,
        fps: this.weaponForm.value.fps,
        rof: this.weaponForm.value.rof,
        skuteczny: this.weaponForm.value.skuteczny,
        opis: this.weaponForm.value.opis
      };
      console.log(newWeapon);
     this.eqS.postWeapon(newWeapon).pipe(first()).subscribe(data =>{
          newWeapon._id=data.created_id;
          this.eqS.weaponsList.push(newWeapon);
          console.log(data.message);
          this.weaponForm.reset();
          }, error =>{
            alert(error);
          }
        );

    }
    else{
      alert("Sprawdź poprawność formularza.");
    }
  };
  submitItem(){ if(this.weaponForm.valid===true){
    let newItem: Item = {
       _id:'',
       owner:  this.loginS.user.userID,
       nazwa: this.weaponForm.value.nazwa,
       kamo: this.itemForm.value.kamo,
       rodzaj: this.itemForm.value.rodzaj,
       opis: this.weaponForm.value.opis
     };
     console.log(newItem);
    this.eqS.postItem(newItem).pipe(first()).subscribe(data =>{
         newItem._id=data.created_id;
         this.eqS.itemsList.push(newItem);
         console.log(data.message);
         this.weaponForm.reset();
         }, error =>{
           alert(error);
         }
       );

   }
   else{
     alert("Sprawdź poprawność formularza.");
   }}
  submitAccesory(){};


  submitExistingWeapon(){
    if(this.weaponForm.valid===true &&this.selectedWeapon!==null){
     let newWeapon: Weapon = {
        _id:this.selectedWeapon._id,
        owner:  this.loginS.user.userID,
        nazwa: this.weaponForm.value.nazwa,
        rodzaj: this.weaponForm.value.rodzaj,
        fps: this.weaponForm.value.fps,
        rof: this.weaponForm.value.rof,
        skuteczny: this.weaponForm.value.skuteczny,
        opis: this.weaponForm.value.opis
      };
      console.log(newWeapon);
     this.eqS.putWeapon(newWeapon).pipe(first()).subscribe(data =>{
          newWeapon._id=data.created_id;
          this.eqS.weaponsList.push(newWeapon);
          alert(data.message);
          this.weaponForm.reset();
          }, error =>{
            alert(error);
          }
        );

    }
    else{
      alert("Sprawdź poprawność formularza.");
    }
  };

}
