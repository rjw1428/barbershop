import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdminState } from "../models/adminState";

export const selectAdminState = createFeatureSelector<AdminState>("admin")

export const allAboutSelector = createSelector(
    selectAdminState,
    admin => admin.about
        ? Object.values(admin.about)
        : []
)

export const singleAboutSelector = createSelector(
    selectAdminState,
    (admin: AdminState, aboutId: string) => admin.about
        ? admin.about[aboutId]
        : null
)

export const galleryImageSelector = createSelector(
    selectAdminState,
    admin => admin.gallery
        ? Object.values(admin.gallery)
        : []
)

export const adminTeamMemberSelector = createSelector(
    selectAdminState,
    admin => admin.members
        ? Object.values(admin.members)
        : []
)
