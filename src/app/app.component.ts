import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./components/dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private dialog: MatDialog) {
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "30%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    })
  }
}
