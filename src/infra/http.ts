import { AxiosResponse } from './../../node_modules/axios/index.d';
import api from "../api/axios";

export interface IHttpModule {
    get(
        url: string,
        headers: {},
        privated: boolean
    ): Promise<AxiosResponse>;
}

export default class HttpModule implements IHttpModule {
    

    async get(url: string, headers?: {}, privated: boolean = true): Promise<AxiosResponse> {

        return await api.get(url, { headers });
    }

}