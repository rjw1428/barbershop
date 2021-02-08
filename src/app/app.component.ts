import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'interview';
  constructor(private service: ServiceService) { }
}
