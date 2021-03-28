import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../../upload.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appState';
import { AdminActions } from '../../admin.action-types';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss']
})
export class GalleryFormComponent implements OnInit {
  filePreview: any
  uploadValue: number
  error: string
  success: string
  constructor(
    private dialogRef: MatDialogRef<GalleryFormComponent>,
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }


  async onFilesSelected(image: FileList) {
    const selectedFile = image.item(0)
    this.filePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(selectedFile))
    const uploadSuccessFileName = await this.uploadService.pushUpload(selectedFile, 'gallery', (percent) => this.uploadValue = percent)
    if (uploadSuccessFileName) {
      const url = await this.uploadService.getImage(uploadSuccessFileName)
      this.success = "Upload Success"
      this.store.dispatch(AdminActions.uploadGalleryImage({ image: { refURL: uploadSuccessFileName, isActive: true, url } }))
      setTimeout(() => {
        this.dialogRef.close()
      }, 1000)
    }
    else this.error = "An error occured while uploading. Please close form and try again."
  }
}
