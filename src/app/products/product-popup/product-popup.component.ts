import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Popup } from 'src/app/models/popup';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Popup
  ) { }


  ngOnInit(): void {
  }

}
