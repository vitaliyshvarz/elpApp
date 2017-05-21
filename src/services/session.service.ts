import { Injectable }                     from '@angular/core';
import { Http, RequestOptions, Headers }  from '@angular/http';
import { Storage }                        from '@ionic/storage';

@Injectable()

export class SessionService {

  constructor(private http: Http, private storage: Storage) { }

  addTokenHeader() {

    // create authorization header with jwt token
    return this.storage.get('currentUser').then((user) => {
      const userData: any = JSON.parse(user) || {};
      return this.storage.get('sessionToken').then((token) => {
        const sessionToken: any = JSON.parse(token) || {};
        let currentUser = !!userData.firstName ? userData : null;
        if (currentUser && sessionToken) {
          let headers = new Headers({ 'x-access-token': sessionToken });
          return new RequestOptions({ headers: headers });
        } else {
          return 'No token';
        }
      });
    });
  }
}
