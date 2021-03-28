import { createAction, props } from "@ngrx/store";
import { User } from "../models/user";

// ------- USER ----- 
export const login = createAction(
    "[Login Compone t] Login",
    props<{ username: string, password: string }>()
)

export const storeUserState = createAction(
    "[Login Effect] Logged In",
    props<{ user: any }>()
)

export const getUserAccount = createAction(
    "[Login Effect] Fetch User Account Info",
    props<{ uid: string }>()
)

export const storeUserAccount = createAction(
    "[Login Effect] Store User Account Info",
    props<{ user: User }>()
)

export const noAction = createAction(
    '[Login Effect] No Action'
)

export const throwLoginError = createAction(
    "[Login Effect] Log In Auth Error",
    props<{ message: string }>()
)