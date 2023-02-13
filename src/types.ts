// servers

export type InviteUserToServerInput = {
    serverId: string;
    librarySectionIds?: number[];
    userId?: string;
    email: string;
} | {
    serverId: string;
    librarySectionIds?: number[];
    userId: string;
    email?: string;
};

export interface GetSharedServersInput {
    serverId: string;
};

export interface Section {
    id: string;
    key: string;
    title: string;
    type: string;
    shared: string;
};

export interface SharedServer {
    MediaContainer: {
        SharedServer: {
            Section: { "$": Section }[];
            "$": {
                id: string;
                username: string;
                email: string;
                userID: string;
                accessToken: string;
                name: string;
                acceptedAt: string;
                invitedAt: string;
                allowSync: string;
                allowCameraUploads: string;
                allowChannels: string;
                allowTuners: string;
                allowSubtitleAdmin: string;
                owned: string;
                allLibraries: string;
                filterAll: string;
                filterMovies: string;
                filterMusic: string;
                filterPhotos: string;
                filterTelevision: string;
            };
        }[];
    };
};

// General

// export type PlexAPIInputType = any;
// export type PlexAPIReturnDataType = any;
// export interface ReturnErrorType {
//     message: string;
//     statusCode: number;
// };
// export type PlexAPIReturnType<ReturnDataType extends PlexAPIReturnDataType> = {
//     data: ReturnDataType;
//     error?: undefined;
// } | {
//     data?: undefined;
//     error: ReturnErrorType;
// }
// export type PlexAPIRequestFunction<
//     InputType extends PlexAPIInputType,
//     ReturnDataType extends PlexAPIReturnDataType
// > = (options: InputType) => Promise<PlexAPIReturnType<ReturnDataType>>;

// export type PlexAPIEndpointName = "server";
// // export type PlexAPIEndpointName = "Server" | "Troubleshooting" | "Playlists" | "Library";
// export type PlexAPIEndpoint = Record<ServerEndpointName, ServerEndpoint[keyof ServerEndpoint]>;
// export type PlexAPIEndpoints = Record<PlexAPIEndpointName, PlexAPIEndpoint>;

export interface BasePlex {
    token: string;
    apiUrl: string;
};

export interface PlexOptions {
    token: string;
};