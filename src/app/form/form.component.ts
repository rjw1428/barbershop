import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { UploadService } from '../admin/upload.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  applicationForm: FormGroup
  readonly formKeys = {
    first: 'first',
    last: 'last',
    email: 'email',
    phone: 'phone',
    hasLicense: 'hasLicense',
    insta: 'insta',
  }
  resume: File
  uploadValue$ = new Subject<number>()
  isSaving = new BehaviorSubject<boolean>(false)
  isComplete = new BehaviorSubject<boolean>(false)
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    const validator = [Validators.required]
    const keys = Object.values(this.formKeys);
    const last = keys.length - 1;
    const form = keys
      .map((value, i) => ({
        [value]: [
          value === this.formKeys.hasLicense ? 'No' : '', // Set initial value
          i !== last ? validator : [] // Set required fields
        ]
      }))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {})
    this.applicationForm = this.formBuilder.group(form)
  }

  async onSubmit() {
    // <!-- ATTACH RESUME TO EMAIL (or add a download link)-->
    if (this.applicationForm.valid) {
      this.isSaving.next(true)


      let uploadSuccessFileName = null
      let template = {
        name: 'newApplicant',
        data: { ...this.applicationForm.value }
      }
      const adminEmail = await this.db.database.ref('/misc/adminEmail').once('value')

      if (!!this.resume) {
        uploadSuccessFileName = await this.uploadService.pushUpload(this.resume, 'resumes', (percent) => this.uploadValue$.next(percent * .95))
        const url = await this.uploadService.getImage(uploadSuccessFileName)
        template = {
          name: 'newApplicantWithRes',
          data: { ...this.applicationForm.value, resume: url }
        }
      }

      await this.afs.collection('applications').add({
        to: adminEmail.val(),
        template
      })
      this.uploadValue$.next(100)
      setTimeout(() => {
        this.isComplete.next(true)
        this.isSaving.next(false)
      }, 100)
    }
  }

  onBack() {
    this.router.navigate([''])
  }

  onResumeSelect(image: FileList) {
    this.resume = image[0]
  }
}
