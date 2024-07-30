import BaseClient from "./BaseClient"
import { ResponseEntity } from "express"; // Assuming ResponseEntity is similar to express's Response

import { HOSTNAME } from "../util/HostnameConfig";
import {GetUserResponseBody} from "../model/get/GetUserResponseBody";
import { GetListUsersResponseBody } from "../model/get/GetListUsersResponseBody";
import { PostCreateUserResponseBody } from "../model/post/PostCreateUserResponseBody";
import { PostCreateUserRequestBody } from "../model/post/PostCreateUserRequestBody";
import { PostAuthResponseBody } from "../model/post/PostAuthResponseBody";
import { PostAuthRequestBody } from "../model/post/PostAuthRequestBody";


export class MetergramClient extends BaseClient {
    private static readonly authenticate = "register";
    private Token: string;
    private name: string;
    private job: string;
    private email: string;
    private password: string;

    private postAuthRequestBody: PostAuthRequestBody;


    constructor(email: string, password: string, name: string = null, job: string = null) {
        super();
        this.baseUrl = HOSTNAME;
        this.email = email;
        this.password = password;
        this.name = name;
        this.job = job;
        
        this.postAuthRequestBody = {
            email: this.email,
            password: this.password
        };
        this.authenticate();
    }

    private async authenticate(){
        const responseEntity: ResponseEntity<PostAuthResponseBody> =  await this.register();
        this.Token = responseEntity.data.token;
        // console.log(this.Token)
    }
    private register(): ResponseEntity<PostAuthResponseBody>{
        return this.post("register", this.postAuthRequestBody);
    }

    public getUserById(id: number): ResponseEntity<GetUserResponseBody> {
        return this.get( "users/" + id);
    }

    public getListUsers(page?: number, per_page?: number): ResponseEntity<GetListUsersResponseBody>{
        let query = "users?";
        const params = [];

        if (page !== undefined)
            params.push(`page=${page}`);

        if (per_page !== undefined)
            params.push(`per_page=${per_page}`);

        query += params.join("&");

        return this.get(query);
    }

    public createUser(): ResponseEntity<PostCreateUserResponseBody>{
        const body: PostCreateUserRequestBody = {
            name: this.name,
            job: this.job
        }

        return this.post("users", body);
    }

    public deleteUser(id: number){
        return this.delete( "users/" + id);
    }

    public setName(name: string){
        this.name = name;
    }
    public setJob(job: string){
        this.job = job;
    }

    public getName(){
        return this.name;
    }

    public getJob(){
        return this.job;
    }
}
