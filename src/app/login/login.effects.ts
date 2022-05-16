import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, SnapshotAction } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, filter, find, first, flatMap, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { AppActions } from "../app.action-types";
import { AppState } from "../models/appState";
import { User } from "../models/user";
import { LoginActions } from "./login.action-types";

@Injectable()
export class LoginEffects {

    logUserIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.login),
            switchMap(({ username, password }) => this.firebaseAuth.signInWithEmailAndPassword(username, password)
                .then(resp => LoginActions.getUserAccount({ uid: resp.user.uid }))
                .catch(resp => LoginActions.throwLoginError({ message: resp.message }))
            )
        )
    )

    getUserAccount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.getUserAccount),
            map(({ uid }) => {
                const lastLogin = new Date().getTime().toString()
                const user: User = { id: uid, lastLogin }
                return user
            }),
            tap(user => this.db.object(`users/${user.id}`).update({ lastLogin: user.lastLogin })),
            map(user => LoginActions.storeUserAccount({ user }))
        )
    )

    // checkUserPersistance$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(AppActions.checkUserPersistance),
    //         switchMap(() => new Promise((resolve, reject) => {
    //             this.firebaseAuth.onAuthStateChanged(authData => resolve(authData))
    //         })),
    //         map(authData => {
    //             console.log(authData)
    //             return authData
    //                 ? LoginActions.getUserAccount({ uid: authData['uid'] })//User Session has persisted
    //                 : LoginActions.noAction()
    //         })
    //     )
    // )


    storeUserAccount$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.storeUserAccount),
            map(() => this.router.navigate(['/', 'admin']))
        ), { dispatch: false }
    )

    constructor(
        private store: Store<AppState>,
        private firebaseAuth: AngularFireAuth,
        private actions$: Actions,
        private db: AngularFireDatabase,
        private dialog: MatDialog,
        private router: Router
    ) { }
}
