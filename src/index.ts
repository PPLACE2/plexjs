import { BasePlex, GetSharedServersInput, InviteUserToServerInput, PlexOptions, SharedServer } from "./types";
import { APIRequestOptions, APIRequestReturnType, makeRequest } from "./utils";

export default class Plex implements BasePlex {
    token: string;
    apiUrl: string;

    constructor(options: PlexOptions) {
        this.token = options.token;
        this.apiUrl = "https://plex.tv/api";
    };

    private async makeRequest<ReturnType>(options: APIRequestOptions): APIRequestReturnType<ReturnType> {
        return makeRequest<ReturnType>(this.apiUrl + options.path, {
            ...options,
            headers: {
                ...options.headers,
                "X-Plex-Token": this.token,
            },
        });
    };

    InviteUserToServer(options: InviteUserToServerInput) {
        return this.makeRequest<SharedServer>({
            method: "POST",
            path: `/servers/${options.serverId}/shared_servers`,
            body: {
                server_id: options.serverId,
                shared_server: {
                    invited_id: options.userId,
                    invited_email: options.email,
                    library_section_ids: options.librarySectionIds,
                },
            },
        });
    };

    async UnInviteUserFromServer(options: InviteUserToServerInput) {
        const r = await this.GetSharedServers({ serverId: options.serverId });
        if (r.error) throw r.error;

        const user = r.data.MediaContainer.SharedServer.find(user => user.$.userID === options.userId);
        if (!user) throw new Error("User doesn't have access");

        return this.makeRequest<SharedServer>({
            method: "DELETE",
            path: `/servers/${options.serverId}/shared_servers/${user.$.id}`,
        });
    };

    GetSharedServers(options: GetSharedServersInput) {
        return this.makeRequest<SharedServer>({
            method: "GET",
            path: `/servers/${options.serverId}/shared_servers`,
        });
    };
};