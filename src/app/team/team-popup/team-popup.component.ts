import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Popup } from 'src/app/models/popup';

@Component({
  selector: 'app-team-popup',
  templateUrl: './team-popup.component.html',
  styleUrls: ['./team-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Popup
  ) { }


  ngOnInit(): void {
  }

}
