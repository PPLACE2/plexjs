import fetch from "node-fetch";
import xml2js from 'xml2js';

const XMLToJSON = (XMLString: string): Record<string, any> | null => {
    let data = {};

    xml2js.parseString(XMLString, (err, res) => {
        if (err) throw err;
        else data = res;
    });

    return data;
};

export interface APIRequestOptions {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    body?: Record<string, any>;
    query?: Record<string, any>;
    headers?: Record<string, any>;
};

export type APIRequestReturnType<RequestReturnType> = Promise<{
    data: RequestReturnType;
    error?: undefined;
} | {
    error: {
        message: string;
        statusCode: number;
    };
    data?: undefined;
}>;

export const makeRequest = async <RequestReturnType>(url: string, options: APIRequestOptions): APIRequestReturnType<RequestReturnType> => {
    if (options.query) url += `?${new URLSearchParams(options.query)}`;

    const res = await fetch(url, {
        method: options.method,
        body: options.method === "GET" ? undefined : JSON.stringify(options.body),
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    let data: any;
    
    data = await res.text();

    if (res.status >= 200 && res.status < 300) return { data: data.includes("<?xml") ? XMLToJSON(data) : data };
    else return {
        error: {
            message: data.message || `Request failed with status code ${res.status}\n${data.toString()}`,
            statusCode: res.status,
        },
    };
};