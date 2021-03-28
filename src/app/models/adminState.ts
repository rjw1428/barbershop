import { About } from "./about";
import { GalleryImg } from "./galleryImg";
import { Member } from "./member";

export interface AdminState {
    isLoading: boolean,
    user: any,
    about: { [timestamp: string]: About },
    gallery: { [id: string]: GalleryImg },
    members: { [id: string]: Member },

}
