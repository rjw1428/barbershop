import { About } from "./about";

export interface AdminState {
    isLoading: boolean,
    user: any,
    about: { [timestamp: string]: About }
}
