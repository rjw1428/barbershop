import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {

  constructor(
    private service: ServiceService
  ) { }

  ngOnInit(): void {
  }

  onBook() {
    this.service.book()
  }

}
