import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, SnapshotAction } from "@angular/fire/database";
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/firestore";
import { MatDialog } from "@angular/material/dialog";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { forkJoin, from, of } from "rxjs";
import { filter, find, first, flatMap, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { AppActions } from "../app.action-types";
import { About } from "../models/about";
import { AppState } from "../models/appState";
import { Product } from "../models/product";
import { AdminActions } from "./admin.action-types";

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

    logUserIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.login),
            switchMap(({ username, password }) => this.firebaseAuth.signInWithEmailAndPassword(username, password)),
            map(resp => {
                console.log(resp)
                return AdminActions.storeUserState({ user: resp.user.email })
                // if (!resp.user.emailVerified) console.log("NOT VERIFIED")
                // return resp.user.emailVerified
                //     ? AppActions.getUserAccount({ uid: resp.user.uid })//User Session has persisted
                //     : AppActions.noAction()
            })
        )
    )

    constructor(
        private store: Store<AppState>,
        private firebaseAuth: AngularFireAuth,
        private actions$: Actions,
        private afs: AngularFirestore,
        private db: AngularFireDatabase,
        private dialog: MatDialog

    ) { }
}
