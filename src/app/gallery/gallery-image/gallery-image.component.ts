import { Component, ElementRef, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter } from 'events';
import { Popup } from 'src/app/models/popup';
import { TeamPopupComponent } from 'src/app/team/team-popup/team-popup.component';

@Component({
  selector: 'app-gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss']
})
export class GalleryImageComponent implements OnInit, OnChanges {
  @Input() image: string
  @Input() width: number
  @Input() margin: number
  @Input() index: number
  @Input() active: number
  @Input() total: number
  @Output() offScrren = new EventEmitter()
  @ViewChild('elemet') element: ElementRef
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    // if (this.active - 2 == this.index && ![0, 1].includes(this.active)) {
    //   console.log("MOVE: " + this.index)
      // if (this.element) 
      //   this.element.nativeElement.style.marginLeft = '10vw'//(this.total - 2) * (this.width + this.margin)
    // }
  }

  onClick() {
    this.dialog.open(TeamPopupComponent, {
      data: { title: null, subtitle: null, img: this.image } as Popup
    })
  }
}
