import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, first, map, shareReplay } from 'rxjs/operators';
import { AppActions } from 'src/app/app.action-types';
import { AppState } from 'src/app/models/appState';
import { GalleryImg } from 'src/app/models/galleryImg';
import { GALLERY_MAX, GALLERY_MIN } from 'src/app/shared/util';
import { AdminActions } from '../admin.action-types';
import { galleryImageSelector } from '../admin.selectors';
import { GenericPopupComponent } from '../generic-popup/generic-popup.component';
import { UploadService } from '../upload.service';
import { GalleryFormComponent } from './gallery-form/gallery-form.component';

@Component({
  selector: 'app-gallery-editor',
  templateUrl: './gallery-editor.component.html',
  styleUrls: ['./gallery-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryEditorComponent implements OnInit {
  images$ = this.store.select(galleryImageSelector)
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.images$.pipe(
      first(),
      filter(images => !images.length)
    ).subscribe(() => this.store.dispatch(AdminActions.fetchGalleryImages()))
  }

  onAdd() {
    this.images$.pipe(
      first(),
      map(images => images.length < GALLERY_MAX)
    ).subscribe(valid => {
      if (!valid) return console.log("ADDING TOO MANY")
      this.dialog.open(GalleryFormComponent)
    })
  }

  toggleActive(isActive, imageId) {
    this.store.dispatch(AdminActions.setGalleryImageActive({ isActive, imageId }))
  }

  onRemove(imgObj) {
    this.images$.pipe(
      first(),
      map(images => images.length > GALLERY_MIN)
    ).subscribe(valid => {
      if (!valid) return console.log("REMOVING WILL CREATE TOO FEW")
      const { url, ...image } = imgObj
      this.dialog.open(GenericPopupComponent, {
        data: {
          title: 'Are you sure?',
          content: `<p style="color: black; font-weight: 700;">You are about to delete ${image.refURL}</p>`,
          actionLabel: 'Delete',
          action: () => this.store.dispatch(AdminActions.deleteGalleryImage({ image }))
        }
      })
    })
  }

  onRotate(rotation: number, image: GalleryImg) {
    this.store.dispatch(AdminActions.rotateGalleryImage({ rotation: image.rotation + rotation, id: image.id }))
  }

  identify(index: number, item: GalleryImg) {
    return item.id
  }
}
