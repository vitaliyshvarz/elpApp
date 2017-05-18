import { Injectable }                              from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()

export class SessionService {

    constructor(private http: Http) { }

    addTokenHeader() {
        // create authorization header with jwt token
        const userData: any = JSON.parse(localStorage.getItem('currentUser')) || {};
        const sessionToken: any = JSON.parse(localStorage.getItem('sessionToken')) || {};
        let currentUser = !!userData.firstName ? userData : null;
        if (currentUser && sessionToken) {
            let headers = new Headers({ 'x-access-token': sessionToken });
            return new RequestOptions({ headers: headers });
        } else {
            console.error('No token found!');
        }
    }
}
