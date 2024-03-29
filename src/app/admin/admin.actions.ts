import { createAction, props } from "@ngrx/store";
import { About } from "../models/about";
import { GalleryImg } from "../models/galleryImg";
import { Hours } from "../models/hours";
import { Member } from "../models/member";
import { Product } from "../models/product";
import { User } from "../models/user";

export const logOut = createAction(
    "[Admin Component] Log Out"
)

// ------- PRODUCT ----- 
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

// ------- HOURS ----- 
export const updateHours = createAction(
    "[Hours Editor Component] Edit Hours",
    props<{ hours: Hours }>()
)


// ------- ABOUT ----- 
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

// ------- GALLERY ----- 
export const fetchGalleryImages = createAction(
    "[Gallery Editor Component] Fetch All Gallery Images"
)

export const storeGalleryImages = createAction(
    "[Admin Effect] Store All Gallery Images",
    props<{ gallery: { [id: string]: GalleryImg } }>()
)

export const uploadGalleryImage = createAction(
    "[Upload Service] Image Upload Success",
    props<{ image: GalleryImg }>()
)

export const setGalleryImageActive = createAction(
    "Gallery Editor Component] Set Image Activity",
    props<{ isActive: boolean, imageId: string }>()
)

export const deleteGalleryImage = createAction(
    "[Gallery Editor Component] Delete Gallery Image",
    props<{ image: GalleryImg }>()
)

export const rotateGalleryImage = createAction(
    "[Gallery Editor Component] Rotate Gallery Image",
    props<{ rotation: number, id: string }>()
)

// ------- TEAM ----- 
export const fetchTeamMembers = createAction(
    "[Team Editor Component] Fetch All Team Members"
)

export const saveTeamMember = createAction(
    "[Team Editor Component] Save Team Members",
    props<{ member: Member }>()
)

export const storeTeamMembers = createAction(
    "[Admin Effect] Store All Team Members",
    props<{ members: { [id: string]: Member } }>()
)

export const deleteMember = createAction(
    "[Team Editor Component] Delete Team Members",
    props<{ member: Member }>()
)

export const updateTeamMember = createAction(
    "[Team Editor Component] Update Team Members",
    props<{ member: Member }>()
)

export const toggleBanner = createAction(
    "[Team Editor Component] Toggle Join Team Banner",
    props<{showJoinBanner: boolean}>()
)

export const updateBannerText = createAction(
    "[Team Editor Component] Update Join Team Banner Text",
    props<{joinBannerText: string}>()
)