import { PostCreateUserRequestBody } from "./PostCreateUserRequestBody";

export interface PostCreateUserResponseBody {
    data: PostCreateUserRequestBody;
    id: string;
    createdAt: string;
}