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


    constructor(
        private actions$: Actions,
        private afs: AngularFirestore,
        private db: AngularFireDatabase,
        public dialog: MatDialog,
        private router: Router
    ) { }
}