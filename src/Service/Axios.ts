import { MaxApiRetries, RetryDelay } from "@/constants"
import axios, { HttpStatusCode, type AxiosResponse } from "axios"


const getHeaderValue = (): string => {
    const token = localStorage.getItem("AuthToken")
    return token ? token : ""
}


//dont use this raw Api use ThunderApi to call http methods
export const Api = axios.create({
    headers: {
        Authorization: getHeaderValue()
    },
})



type httpMethods = "get" | "post" | "delete" | "put"
const statusesNotToBeRetries = [404, 500, 403, 400, HttpStatusCode.Conflict]

export const ThunderApi = (data: any, url: string, method: httpMethods, cache: boolean = false, maxAttempts: number = MaxApiRetries) :Promise<AxiosResponse>=> {
    let retries = 0;
    return new Promise((resolve, reject) => {
        const attempt = async () => {
            try {
                let response:AxiosResponse;
                switch (method) {
                    case "get":
                        //inside get data is actually key value based query params so construct it

                        response = await Api.get(url);
                        break;
                    case "post":
                        response = await Api.post(url, data);
                        break;
                    case "delete":
                        response = await Api.delete(url);
                        break;
                    case "put":
                        response = await Api.put(url, data);
                        break;
                }
                resolve(response); // success → resolve
            } catch (err) {
                
                if (axios.isAxiosError(err)) {
                    if(!err?.response){
                        //response not present it can be cors error or any other such error
                         return reject(err);
                    }
                    const status = err.response?.status;

                    if (status && statusesNotToBeRetries.includes(status)) {
                        return reject(err);
                    }
                }

                retries++;

                if (retries > maxAttempts) {
                    return reject(err); // too many retries → reject
                }

                // schedule next attempt with staggered delay
                const nextDelay = 1000 + (retries * RetryDelay);
                setTimeout(attempt, nextDelay);
            }
        };

        // start first attempt
        attempt();
    });
};

