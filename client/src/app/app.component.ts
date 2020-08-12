import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  constructor(public dialog:MatDialog) {}
  ngAfterViewInit() { this.openDialog();}

  openDialog(): void {
    const dialogRef=this.dialog.open(SiteDialog, {
  height: '400px',
  width: '600px',
});
    dialogRef.afterClosed().subscribe(result => {
     console.log(`Dialog result: ${result}`);
   });
  }
  title = 'client';
}

@Component({
  selector: 'app-site-dialog',
  templateUrl:'./site-dialog.html'
})

export class SiteDialog{
  constructor(public dialogRef:MatDialogRef<SiteDialog>) {}
mySite(){
  console.log('mySite');
  this.dialogRef.close();
}
myWork(){
  console.log('myWork');
  this.dialogRef.close();
}
}
