import { createReducer, on } from "@ngrx/store"
import { LoginActions } from "./login.action-types"

export const initialState: { error: string } = {
    error: null
}

export const loginReducer = createReducer(
    initialState,
    on(LoginActions.throwLoginError, (state, { message }) => ({ ...state, error: message })),
)