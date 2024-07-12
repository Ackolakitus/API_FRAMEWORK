import { GetUserResponseBody } from '../model/get/GetUserResponseBody';
import { MetergramClient } from "../http/MetergramClient";
import {describe, expect, test} from '@jest/globals';
import { GetListUsersResponseBody } from '../model/get/GetListUsersResponseBody';
import { PostAuthResponseBody } from '../model/post/PostAuthResponseBody';


describe('TestCasesTests', () => {
    let metergramClient: MetergramClient;

    beforeEach(() => {
        metergramClient = new MetergramClient();
    });

    test('GetUserByID', async () => {
        const responseEntity = await metergramClient.getUserById(3);
        const user: GetUserResponseBody = responseEntity.data;
        expect(user.data.id).toEqual(3)
        expect(user.data.email).toEqual("emma.wong@reqres.in")
    });

    test('GetUserByIDFail', async () => {
        const responseEntity = await metergramClient.getUserById(1);
        const user: GetUserResponseBody = responseEntity.data;
        expect(user.data.id).toEqual(1)
        expect(user.data.email).toEqual("george.bluth@reqres.in")
    });

    test('NotFoundError', async () => {
        const responseEntity = await metergramClient.getUserById(23);
        const status: GetUserResponseBody = responseEntity.status;
        const statusText: GetUserResponseBody = responseEntity.statusText
        expect(statusText).toEqual('Not Found');
        expect(status).toEqual(404)
    });

    test('GetListUsers', async ()=> {
        const responseEntity = await metergramClient.getListUsers(1, 10);
        const status: GetUserResponseBody = responseEntity.status;
        const statusText: GetUserResponseBody = responseEntity.statusText
        expect(statusText).toEqual('OK');
        expect(status).toEqual(200)

        const listUsers: GetListUsersResponseBody = responseEntity.data;

        const user: GetUserResponseBody["data"] = listUsers.data[4];
        // console.log(user);
        expect(user.id).toEqual(5);
        expect(user.email).toEqual("charles.morris@reqres.in");
        expect(user.first_name).toEqual("Charles");
        expect(user.last_name).toEqual("Morris");
        expect(user.avatar).toEqual("https://reqres.in/img/faces/5-image.jpg");
    })

    test('PostCreateUser', async ()=>{
        const name = "Aleksandar";
        const job = "QA intern";

        const responseEntity = await metergramClient.createUser(name, job);
        // console.log(responseEntity);

        expect(responseEntity.status).toEqual(201);
        expect(responseEntity.statusText).toEqual('Created');

        expect(responseEntity.data.name).toEqual(name);
        expect(responseEntity.data.job).toEqual(job);
    })

    test('Delete10thUser', async () => {
        const responseEntity = await metergramClient.deleteUser(10);

        expect(responseEntity.status).toEqual(204);
        expect(responseEntity.statusText).toEqual('No Content');
    })

    test.only('RegisterEndpoint', async () => {
    
    })
});
