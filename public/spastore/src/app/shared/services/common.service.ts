import {Injectable} from '@angular/core';
export class CommonService {
    getFromLocalStorage(key : string) {
        try
        {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            this.removeFromLocalStorage(key);
        }

    }

    setInLocalStorage(key : string, value : any) {
        console.log(value)
        localStorage.setItem(key, JSON.stringify(value));
    }

    removeFromLocalStorage(key : string) {
        localStorage.removeItem(key);
    }

    getFromSessionStorage(key : string) {
        try
        {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            this.removeFromSessionStorage(key);
        }
    }

    setInSessionStorage(key : string, value : any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    removeFromSessionStorage(key : string) {
        sessionStorage.removeItem(key);
    }

}