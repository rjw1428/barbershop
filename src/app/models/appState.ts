import { AdminState } from "./adminState";
import { FrontEndState } from "./frontEndState";

export interface AppState {
    app: FrontEndState,
    admin: AdminState,
    login: { error: string }
}
