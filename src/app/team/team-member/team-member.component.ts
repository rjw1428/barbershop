import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {
  @Input() member: Member
  @Output() selected = new EventEmitter<Member>()
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.selected.emit(this.member)
  }
}
