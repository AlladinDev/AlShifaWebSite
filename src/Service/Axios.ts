import {  MaxApiRetries, RetryDelay } from "@/constants"
import axios from "axios"


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

export const ThunderApi = (data: any, url: string, method: httpMethods,cache:boolean=false,maxAttempts:number=MaxApiRetries) => {
    let retries = 0;
    return new Promise((resolve, reject) => {
        const attempt = async () => {
            try {
                let response;
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

