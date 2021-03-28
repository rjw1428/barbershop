import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./models/appState";
import { FrontEndState } from "./models/frontEndState";
import { shortDayMap } from './shared/util'

export const selectAppState = createFeatureSelector<FrontEndState>("app")

export const loadingSelector = createSelector(
    selectAppState,
    app => app.isLoading
)

export const hoursSelector = createSelector(
    selectAppState,
    (app: FrontEndState) => app.hours
        ? Object.keys(app.hours)
            .map(key => ({
                ...app.hours[key],
                dayShort: shortDayMap[app.hours[key].day],
                id: key
            }))
        : []
)

export const aboutSelector = createSelector(
    selectAppState,
    (app: FrontEndState) => app.about
        ? Object.values(app.about)
        : []
)

export const productsSelector = createSelector(
    selectAppState,
    (app: FrontEndState) => app.products
        ? Object.keys(app.products)
            .map(key => ({ ...app.products[key], id: key }))
        : []
)

export const teamMemberSelector = createSelector(
    selectAppState,
    app => app.members
        ? Object.values(app.members)
        : []
)

export const gallerySelector = createSelector(
    selectAppState,
    app => app.gallery
        ? Object.values(app.gallery).filter(img=>img.isActive)
        : []
)