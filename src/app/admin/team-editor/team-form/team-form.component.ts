import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/models/appState';
import { Member } from 'src/app/models/member';
import { AdminActions } from '../../admin.action-types';
import { UploadService } from '../../upload.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  memberForm: FormGroup
  selectedFile: File
  filePreview: any
  uploadValue: number
  error: string
  success: string
  isSaving: boolean
  constructor(
    private dialogRef: MatDialogRef<TeamFormComponent>,
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public member: Member
  ) { }

  ngOnInit(): void {
    this.memberForm = this.formBuilder.group({
      name: [this.member ? this.member.name : '', Validators.required],
      position: [this.member ? this.member.position : '', Validators.required]
    })
  }


  onFilesSelected(image: FileList) {
    this.selectedFile = image.item(0)
    this.filePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile))
  }

  async onSave() {
    if (!this.memberForm.valid) return this.error = "Add Team Member name and position."
    if (!this.filePreview && !this.member) return this.error = "Don't forget to add a picture!"

    this.isSaving = true

    if (!this.selectedFile && this.member) {
      const member = { id: this.member.id, ...this.memberForm.value, }
      this.store.dispatch(AdminActions.updateTeamMember({ member }))
      return this.dialogRef.close()
    }
    const uploadSuccessFileName = await this.uploadService.pushUpload(this.selectedFile, 'team', (percent) => this.uploadValue = percent)
    if (uploadSuccessFileName) {
      const url = await this.uploadService.getImage(uploadSuccessFileName)
      this.success = "Upload Success"
      const member = { ...this.memberForm.value, img: uploadSuccessFileName, url, id: this.member ? this.member.id : null }
      const action = this.member
        ? AdminActions.updateTeamMember({ member })
        : AdminActions.saveTeamMember({ member })

      this.store.dispatch(action)
      setTimeout(() => {
        this.dialogRef.close()
      }, 1000)
    }
    else {
      this.error = "An error occured while uploading. Please close form and try again."
      this.isSaving = false
    }
  }
}
