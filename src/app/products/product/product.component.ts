import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Popup } from 'src/app/models/popup';
import { Product } from 'src/app/models/product';
import { ProductPopupComponent } from '../product-popup/product-popup.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product: Product
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  moreInfo() {
    this.dialog.open(ProductPopupComponent, {
      data: { title: this.product.name, subtitle: this.product.description } as Popup
    })
  }
}
