import { createReducer, on } from "@ngrx/store"
import { AdminState } from "../models/adminState"
import { AdminActions } from "./admin.action-types"

export const initialState: AdminState = {
    isLoading: false,
    user: null,
    about: null,
    gallery: null,
    members: null
}

export const adminReducer = createReducer(
    initialState,
    on(AdminActions.addProduct, (state) => ({ ...state, isLoading: true })),
    on(AdminActions.storeUserState, (state, { user }) => ({ ...state, user })),
    on(AdminActions.storeAllAbout, (state, { about }) => ({ ...state, about })),
    on(AdminActions.storeGalleryImages, (state, { gallery }) => ({ ...state, gallery })),
    on(AdminActions.storeTeamMembers, (state, { members }) => ({ ...state, members }))
)