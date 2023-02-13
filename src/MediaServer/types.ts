// shitty API docs lead to hundreds of TODOs -_-
// also, since it's XML (WHYYYYY), all booleans are 0 | 1 -_________-

// Server

// export type ServerEndpointName = "getCapabilities" | "getIdentity" | "getPreferences" | "getLibraries" | "getAccounts" | "getDevices" | "getActiveSessions";
export type ServerEndpointName = "getCapabilities" | "getAccounts";

export interface ServerEndpoint {
    getCapabilities: PlexMediaServerAPIRequestFunction<GetServerCapabilitiesInput, GetServerCapabilitiesOutput>;
    getAccounts: PlexMediaServerAPIRequestFunction<GetServerAccountsInput, GetServerAccountsOutput[]>
};

// GetServerCapabilities Input

export type GetServerCapabilitiesInput = undefined;

// GetServerCapabilities Output

export type GetServerCapabilitiesOutput = {
    allowCameraUpload: 0 | 1;
    allowChannelAccess: 0 | 1;
    allowMediaDeletion: 0 | 1;
    allowSharing: 0 | 1;
    allowSync: 0 | 1;
    allowTuners: 0 | 1;
    // TODO:
    backgroundProcessing: unknown;
    // TODO:
    companionProxy: unknown;
    countryCode: string;
    // TODO:
    diagnostics: unknown[];
    // TODO:
    eventStream: unknown;
    friendlyName: string;
    hubSearch: 0 | 1;
    // TODO:
    itemClusters: unknown;
    livetv: number;
    machineIdentifier: string;
    // TODO:
    mediaProviders: unknown[];
    // TODO:
    musicAnalysis: number;
    // TODO:
    myPlex: unknown;
    // TODO:
    myPlexMappingState: unknown;
    // TODO:
    myPlexSigninState: unknown;
    myPlexSubscription: 0 | 1;
    myPlexUsername: string;
    offlineTranscode: 0 | 1;
    // TODO:
    ownerFeatures: unknown[];
    photoAutoTag: 0 | 1;
    platform: string;
    platformVersion: string;
    // TODO:
    pluginHost: unknown;
    pushNotifications: 0 | 1;
    readOnlyLibraries: 0 | 1;
    streamingBrainABRVersion: number;
    streamingBrainVersion: number;
    sync: 0 | 1;
    transcoderActiveVideoSessions: number;
    transcoderAudio: 0 | 1;
    transcoderLyrics: 0 | 1;
    transcoderPhoto: 0 | 1;
    transcoderSubtitles: 0 | 1;
    transcoderVideo: 0 | 1;
    transcoderVideoBitrates: number[];
    updatedAt: number;
    updated: unknown;
    version: string;
    voiceSearch: 0 | 1;
};

// GetServerAccounts input

export type GetServerAccountsInput = undefined;

// GetServerAccounts output

export interface GetServerAccountsOutput {
    
};

// General

export type PlexMediaServerAPIInputType = any;
export type PlexMediaServerAPIReturnDataType = any;
export interface ReturnErrorType {
    message: string;
    statusCode: number;
};
export type PlexMediaServerAPIReturnType<ReturnDataType extends PlexMediaServerAPIReturnDataType> = {
    data: ReturnDataType;
    error?: undefined;
} | {
    data?: undefined;
    error: ReturnErrorType;
}
export type PlexMediaServerAPIRequestFunction<
    InputType extends PlexMediaServerAPIInputType,
    ReturnDataType extends PlexMediaServerAPIReturnDataType
> = (options: InputType) => Promise<PlexMediaServerAPIReturnType<ReturnDataType>>;

export type PlexMediaServerAPIEndpointName = "server";
// export type PlexMediaServerAPIEndpointName = "Server" | "Troubleshooting" | "Playlists" | "Library";
export type PlexMediaServerAPIEndpoint = Record<ServerEndpointName, ServerEndpoint[keyof ServerEndpoint]>;
export type PlexMediaServerAPIEndpoints = Record<PlexMediaServerAPIEndpointName, PlexMediaServerAPIEndpoint>;

export interface BasePlexMediaServer extends PlexMediaServerAPIEndpoints {
    token: string;
    serverIPAddress: string;
    apiUrl: string;
};

export interface PlexMediaServerOptions {
    token: string;
    port: number;
    serverIPAddress: string;
};