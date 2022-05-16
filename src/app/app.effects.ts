import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/firestore";
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppActions } from "./app.action-types";
import { map, switchMap } from "rxjs/operators";
import { Hours } from "./models/hours";
import { Product } from "./models/product";
import { AdminActions } from "./admin/admin.action-types";
import { About } from "./models/about";
import { Member } from "./models/member";
import { GalleryImg } from "./models/galleryImg";



@Injectable()
export class AppEffects {

    fetchHours$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchHours),
            switchMap(() => this.db.list('hours').snapshotChanges()),
            map((resp: SnapshotAction<Hours>[]) => {
                const hours = resp
                    .map(val => ({ [val.key]: { ...val.payload.val(), id: val.key } }))
                    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
                return AppActions.storeHours({ hours })
            })
        )
    )

    fetchAbout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchAbout),
            switchMap(() => this.db.list('about', ref => ref.orderByChild('isActive').equalTo(true)).snapshotChanges()),
            map((resp: SnapshotAction<About>[]) => {
                const about = resp
                    .map(val => {
                        const data = val.payload.val()
                        return { ...data.content }
                    })
                    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
                return AppActions.storeAbout({ about })
            })
        )
    )

    fetchProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchProducts),
            switchMap(() => this.db.list('services').snapshotChanges()),
            map((resp: SnapshotAction<Product>[]) => {
                const products = resp
                    .map(val => ({ [val.key]: { ...val.payload.val(), id: val.key } }))
                    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
                return AppActions.storeProducts({ products })
            })
        )
    )

    fetchTeamMembers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchTeamMembers),
            switchMap(() => this.db.list(`team`).snapshotChanges()),
            map((resp: SnapshotAction<Member>[]) => {
                const members = resp
                    .map(val => ({ [val.key]: { ...val.payload.val(), id: val.key } }))
                    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
                return AppActions.storeTeamMembers({ members })
            })
        )
    )

    fetchGalleryImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchGalleryImages),
            switchMap(() => this.db.list(`gallery`).snapshotChanges()),
            map((resp: SnapshotAction<GalleryImg>[]) => {
                const gallery = resp
                    .map((val) => ({ [val.key]: { ...val.payload.val(), id: val.key } }))
                    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
                return AppActions.storeGalleryImages({ gallery })
            })
        )//, { dispatch: false }
    )

    fetchJoinBannerState$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchShowJoinBanner),
            switchMap(() => this.db.object(`misc/showJoinBanner`).snapshotChanges()),
            map((resp: SnapshotAction<boolean>) => {
                const showJoinBanner = resp.payload.val()
                return AppActions.storeJoinBannerState({ showJoinBanner })
            })
        )
    )

    fetchJoinBannerText$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchJoinBannerText),
            switchMap(() => this.db.object(`misc/joinBannerText`).snapshotChanges()),
            map((resp: SnapshotAction<string>) => {
                const joinBannerText = resp.payload.val()
                return AppActions.storeJoinBannerText({ joinBannerText })
            })
        )
    )


    constructor(
        private actions$: Actions,
        private afs: AngularFirestore,
        private db: AngularFireDatabase,
        public dialog: MatDialog,
        private router: Router
    ) { }
}