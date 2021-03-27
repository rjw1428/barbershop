import { createAction, props } from "@ngrx/store";
import { About } from "../models/about";
import { Hours } from "../models/hours";
import { Product } from "../models/product";


export const login = createAction(
    "[MOVE TO LOGIN COMPONENT] Login",
    props<{ username: string, password: string }>()
)


export const storeUserState = createAction(
    "[App Effect] Logged In",
    props<{ user: any }>()
)

export const addProduct = createAction(
    "[Product Editor Component] Add New Product",
    props<{ product: Product }>()
)

export const updateProduct = createAction(
    "[Product Editor Component] Edit Product",
    props<{ product: Product }>()
)

export const deleteProduct = createAction(
    "[Product Editor Component] Delete Product",
    props<{ product: Product }>()
)

export const updateHours = createAction(
    "[Hours Editor Component] Edit Hours",
    props<{ hours: Hours }>()
)

export const fetchAllAbouts = createAction(
    "[About Editor Component] Fetch All Abouts"
)

export const storeAllAbout = createAction(
    "[Admin Effect] Store All Abouts",
    props<{ about: { [timestamp: string]: About } }>()
)

export const setActiveAbout = createAction(
    "[About Editor Component] Set active about",
    props<{ selectedAboutId: string, currentActiveId: string }>()
)

export const saveAbout = createAction(
    "[About Editor Component] Create New About",
    props<{ about: About }>()
)

export const setOtherAboutsToNotActive = createAction(
    "[Admin Effect] Set Old Value to Not Active",
    props<{ newId: string }>()
)