import { BasePlexMediaServer, GetServerAccountsOutput, GetServerCapabilitiesOutput, PlexMediaServerAPIEndpoint, PlexMediaServerOptions } from "./types";
import { APIRequestOptions, APIRequestReturnType, makeRequest } from "../utils";

export default class PlexMediaServer implements BasePlexMediaServer {
    token: string;
    serverIPAddress: string;
    apiUrl: string;

    server: PlexMediaServerAPIEndpoint = {
        getCapabilities: this.GetServerCapabilities,
        getAccounts: this.GetAccounts,
    };
    
    constructor(options: PlexMediaServerOptions) {
        this.token = options.token;
        this.serverIPAddress = options.serverIPAddress;

        this.apiUrl = `http://${options.serverIPAddress}:${options.port || 32400}`;
    };

    private async makeRequest<ReturnType>(options: APIRequestOptions): APIRequestReturnType<ReturnType> {
        return makeRequest<ReturnType>(`${this.apiUrl}${options.path}?X-Plex-Token=${this.token}`, options);
    };

    GetServerCapabilities() {
        return this.makeRequest<GetServerCapabilitiesOutput>({
            method: "GET",
            path: "",
        });
    };

    GetAccounts() {
        return this.makeRequest<GetServerAccountsOutput[]>({
            method: "GET",
            path: "/accounts",
        })
    }
};