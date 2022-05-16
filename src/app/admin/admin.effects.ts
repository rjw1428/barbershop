import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, SnapshotAction } from "@angular/fire/database";
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { forkJoin, from, of } from "rxjs";
import { filter, find, first, flatMap, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { AppActions } from "../app.action-types";
import { About } from "../models/about";
import { AppState } from "../models/appState";
import { GalleryImg } from "../models/galleryImg";
import { Member } from "../models/member";
import { Product } from "../models/product";
import { User } from "../models/user";
import { AdminActions } from "./admin.action-types";
import { UploadService } from "./upload.service";

@Injectable()
export class AdminEffects {

    addNewProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.addProduct),
            switchMap(({ product }) => this.db.list('services').push(product)),
            map((resp) => {
                console.log(resp)
            })
        ), { dispatch: false }
    )

    editProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateProduct),
            switchMap(({ product }) => {
                const { id, ...updatedProduct } = product
                return this.db.object(`services/${id}`).update({ ...updatedProduct })
            })
        ), { dispatch: false }
    )

    deleteProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteProduct),
            switchMap(({ product }) => this.db.object(`services/${product.id}`).remove())
        ), { dispatch: false }
    )


    editHours$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateHours),
            tap(({ hours }) => console.log(hours)),
            switchMap(({ hours }) => {
                const { id, ...updatedHours } = hours
                return this.db.object(`hours/${id}`).update({ ...updatedHours })
            })
        ), { dispatch: false }
    )

    fetchAllAbout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.fetchAllAbouts),
            switchMap(() => this.db.list('about').snapshotChanges()),
            map((resp: SnapshotAction<About>[]) => {
                const about = resp
                    .map(val => ({ [val.key]: { ...val.payload.val(), id: val.key } }))
                    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
                return AdminActions.storeAllAbout({ about })
            })
        )
    )


    setActiveAbout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.setActiveAbout),
            switchMap(({ selectedAboutId, currentActiveId }) => {
                return Promise.all([
                    this.db.object(`about/${currentActiveId}`).update({ isActive: false }),
                    this.db.object(`about/${selectedAboutId}`).update({ isActive: true })
                ])
            })
        ), { dispatch: false }
    )

    saveAbout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.saveAbout),
            map(({ about }) => {
                const { id, ...newAbout } = about
                this.db.database.ref(`about/${id}`).set({ ...newAbout })
                return about.id
            }),
            map((newId) => AdminActions.setOtherAboutsToNotActive({ newId }))
        )
    )

    setOtherAboutsToNotActive$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.setOtherAboutsToNotActive),
            switchMap(({ newId }) =>
                this.store.pipe(
                    first(),
                    map(state => {
                        return Object.values(state.admin.about)
                            .find(about => about.isActive && about.id != newId)
                    })
                )
            ),
            map(oldAbout => this.db.object(`about/${oldAbout.id}`).update({ isActive: false }))
        ), { dispatch: false }
    )

    fetchGalleryImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.fetchGalleryImages),
            switchMap(() => this.db.list(`gallery`).snapshotChanges()),
            map((resp: SnapshotAction<GalleryImg>[]) => {
                const gallery = resp
                    .map((val) => {
                        const image = val.payload.val()
                        return { [val.key]: { ...val.payload.val(), id: val.key } }
                    })
                    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
                return AdminActions.storeGalleryImages({ gallery })
            })
        )//, { dispatch: false }
    )

    rotateGalleryImage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.rotateGalleryImage),
            switchMap(({ id, rotation }) => this.db.object(`gallery/${id}`).update({ rotation }))
        ), { dispatch: false }
    )

    uploadImages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.uploadGalleryImage),
            switchMap(({ image }) => this.db.list(`gallery`).push(image))
        ), { dispatch: false }
    )

    setGalleryImageActive$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.setGalleryImageActive),
            switchMap(({ isActive, imageId }) => this.db.object(`gallery/${imageId}`).update({ isActive }))
        ), { dispatch: false }
    )

    deleteGalleryImage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteGalleryImage),
            switchMap(({ image }) => {
                return Promise.all([
                    this.storage.ref(image.refURL).delete().toPromise(),
                    this.db.object(`gallery/${image.id}`).remove()
                ])
            })
        ), { dispatch: false }
    )


    fetchTeamMembers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.fetchTeamMembers),
            switchMap(() => this.db.list(`team`).snapshotChanges()),
            map((resp: SnapshotAction<Member>[]) => {
                const members = resp
                    .map(val => ({ [val.key]: { ...val.payload.val(), id: val.key } }))
                    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
                return AdminActions.storeTeamMembers({ members })
            })
        )
    )

    addTeamMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.saveTeamMember),
            switchMap(({ member }) => this.db.list(`team`).push(member))
        ), { dispatch: false }
    )

    updateTeamMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateTeamMember),
            switchMap(({ member }) => {
                const { id, ...updatedMember } = member
                return this.db.object(`team/${id}`).update(updatedMember)
            })
        ), { dispatch: false }
    )

    deleteTeamMember$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteMember),
            switchMap(({ member }) => {
                return Promise.all([
                    this.storage.ref(member.img).delete().toPromise(),
                    this.db.object(`team/${member.id}`).remove()
                ])
            })
        ), { dispatch: false }
    )

    toggleBanner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.toggleBanner),
            switchMap(({ showJoinBanner }) => this.db.object(`misc`).update({showJoinBanner}))
        ), { dispatch: false }
    )

    updateBannerText$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.updateBannerText),
            switchMap(({ joinBannerText }) => this.db.object(`misc`).update({joinBannerText}))
        ), { dispatch: false }
    )

    logUserOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.logOut),
            switchMap(() => this.firebaseAuth.signOut())
        ), { dispatch: false }
    )


    constructor(
        private store: Store<AppState>,
        private firebaseAuth: AngularFireAuth,
        private actions$: Actions,
        private storage: AngularFireStorage,
        private db: AngularFireDatabase,
        private uploadService: UploadService,
        private dialog: MatDialog,
        private router: Router
    ) { }
}
