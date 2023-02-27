import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appState';
import { Product } from 'src/app/models/product';
import { AdminActions } from '../../admin.action-types';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup
  constructor(
    private FormBuilder: FormBuilder,
    private store: Store<AppState>,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) { }

  ngOnInit(): void {
    this.productForm = this.FormBuilder.group({
      name: [this.product ? this.product.name : '', Validators.required],
      price: [this.product ? this.product.price : '', Validators.required],
      description: [this.product ? this.product.description : '']
    })
  }

  onSave() {
    if (this.productForm.valid) {
      
      const action = this.product
        ? AdminActions.updateProduct({ product: { ...this.product, ...this.productForm.value } })
        : AdminActions.addProduct({ product: this.productForm.value })

      this.store.dispatch(action)
      this.dialogRef.close()
    }
  }
}
