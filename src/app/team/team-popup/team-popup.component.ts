import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-team-popup',
  templateUrl: './team-popup.component.html',
  styleUrls: ['./team-popup.component.scss']
})
export class TeamPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { member: Member }
  ) { }


  ngOnInit(): void {
  }

}
