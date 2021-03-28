import { createAction, props } from "@ngrx/store";
import { GalleryImg } from "./models/galleryImg";
import { Hours } from "./models/hours";
import { Member } from "./models/member";
import { Product } from "./models/product";

export const startLoading = createAction(
    "[App Component] Start Loading Screen"
)
export const stopLoading = createAction(
    "[App Component] Clear Loading Screen"
)

export const fetchHours = createAction(
    "[Hours Component] Fetch Hours Data"
)

export const storeHours = createAction(
    "[App Effect] Store Hours Data",
    props<{ hours: { [id: string]: Hours } }>()
)

export const fetchAbout = createAction(
    "[About Component] Fetch Hours Data"
)

export const storeAbout = createAction(
    "[App Effect] Store About Data",
    props<{ about: { [id: string]: string } }>()
)

export const fetchProducts = createAction(
    "[Products Component] Fetch Products Data"
)

export const storeProducts = createAction(
    "[App Effect] Store Products Data",
    props<{ products: { [id: string]: Product } }>()
)

export const fetchTeamMembers = createAction(
    "[Team Component] Fetch Team Members"
)

export const storeTeamMembers = createAction(
    "[App Effect] Store Team Members",
    props<{ members: { [id: string]: Member } }>()
)

export const fetchGalleryImages = createAction(
    "[Gallery Component] Fetch Gallery Images"
)

export const storeGalleryImages = createAction(
    "[App Effect] Store Gallery Images",
    props<{ gallery: { [id: string]: GalleryImg } }>()
)