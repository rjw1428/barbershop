import { createReducer, on } from "@ngrx/store";
import { AppActions } from "./app.action-types";
import { FrontEndState } from "./models/frontEndState";

export const initialAppState: FrontEndState = {
    isLoading: false,
    isLoggedIn: false,
    hours: null,
    products: null,
    about: null,
    members: null,
    gallery: null
}
const _appReducer = createReducer(
    initialAppState,
    on(AppActions.startLoading, (state) => ({ ...state, isLoading: true })),
    on(AppActions.stopLoading, (state) => ({ ...state, isLoading: false })),
    on(AppActions.storeHours, (state, { hours }) => ({ ...state, hours })),
    on(AppActions.storeAbout, (state, { about }) => ({ ...state, about })),
    on(AppActions.storeProducts, (state, { products }) => ({ ...state, products })),
    on(AppActions.storeTeamMembers, (state, { members }) => ({ ...state, members })),
    on(AppActions.storeGalleryImages, (state, { gallery }) => ({ ...state, gallery }))
)

export function appReducer(state, action) {
    return _appReducer(state, action);
}