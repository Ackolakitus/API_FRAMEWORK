import {UserData} from "./GetUserData";
import {SupportData} from "./SupportData";

export interface GetListUsersResponseBody {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserData[];
    support: SupportData;
}