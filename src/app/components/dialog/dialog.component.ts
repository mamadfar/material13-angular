import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  productForm !: FormGroup;
  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder,
              private productServices: ProductService,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData: any) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ["", Validators.required],
      category: ["", Validators.required],
      freshness: ["", Validators.required],
      price: ["", Validators.required],
      comment: ["", Validators.required],
      date: ["", Validators.required],
    });
    if (this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls["productName"].setValue(this.editData.productName);
      this.productForm.controls["category"].setValue(this.editData.category);
      this.productForm.controls["freshness"].setValue(this.editData.freshness);
      this.productForm.controls["price"].setValue(this.editData.price);
      this.productForm.controls["comment"].setValue(this.editData.comment);
      this.productForm.controls["date"].setValue(this.editData.date);
    }
  };

  addProductHandler() {
    if (this.productForm.value) {
      this.productServices.createProductService(this.productForm.value).subscribe({
        next: (res) => {
          alert("Product Added Successfully.");
          this.productForm.reset();
          this.dialogRef.close("save");
        },
        error: () => {
          alert("Error While Adding The Product.");
        }
      })
    }
  }
  updateProductHandler() {
    this.productServices.updateProductsService(this.productForm.value, this.editData.id).subscribe({
      next: res => {
        alert("Product Updated Successfully.");
        this.productForm.reset();
        this.dialogRef.close("Update");
      },
      error: () => alert("Error While Updating The Record!!")
    })
  }

}
