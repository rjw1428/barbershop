import { Hours } from "./hours";
import { Product } from "./product";

export interface FrontEndState  {
    isLoading: boolean,
    isLoggedIn: boolean,
    hours: { [id: string]: Hours }
    products: { [id: string]: Product }
    about: { [id: string]: string }
}
