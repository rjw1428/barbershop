import { createAction, props } from "@ngrx/store";
import { Hours } from "./models/hours";
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