import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { AppActions } from 'src/app/app.action-types';
import { hoursSelector, productsSelector } from 'src/app/app.selectors';
import { AppState } from 'src/app/models/appState';
import { Product } from 'src/app/models/product';
import { AdminActions } from '../admin.action-types';
import { GenericPopupComponent } from '../generic-popup/generic-popup.component';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-products-editor',
  templateUrl: './products-editor.component.html',
  styleUrls: ['./products-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsEditorComponent implements OnInit {
  products$ = this.store.select(productsSelector)
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.products$.pipe(
      first(),
      filter(products => !products.length)
    ).subscribe(() => this.store.dispatch(AppActions.fetchProducts()))
  }

  identify(index: number, item: Product) {
    return item.name
  }

  onAdd() {
    this.dialog.open(ProductFormComponent)
  }

  onRemove(product: Product) {
    this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Are you sure?',
        content: `<p style="color: black; font-weight: 700;">You are about to delete ${product.name}</p>`,
        actionLabel: 'Delete',
        action: () => this.store.dispatch(AdminActions.deleteProduct({ product }))
      }
    })
  }

  onEdit(product: Product) {
    this.dialog.open(ProductFormComponent, {
      data: product
    })
  }
}
