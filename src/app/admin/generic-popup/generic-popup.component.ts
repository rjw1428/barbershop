import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-popup',
  templateUrl: './generic-popup.component.html',
  styleUrls: ['./generic-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericPopupComponent implements AfterViewInit {
  @ViewChild('content') contentRef: ElementRef
  constructor(
    private dialogRef: MatDialogRef<GenericPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      content: string,
      actionLabel: string,
      action: () => void
    }) { }

  ngAfterViewInit(): void {
    this.contentRef.nativeElement.innerHTML = this.data.content
  }

  triggerAction() {
    this.dialogRef.close(this.data.action())
  }

}
