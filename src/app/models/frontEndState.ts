import { GalleryImg } from "./galleryImg";
import { Hours } from "./hours";
import { Member } from "./member";
import { Product } from "./product";

export interface FrontEndState  {
    isLoading: boolean,
    isLoggedIn: boolean,
    hours: { [id: string]: Hours }
    products: { [id: string]: Product }
    about: { [id: string]: string }
    members: { [id: string]: Member },
    gallery: { [id: string]: GalleryImg },
    showJoinBanner: boolean,
    joinBannerText: string,
}
