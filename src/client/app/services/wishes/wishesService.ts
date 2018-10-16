import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Injectable()
export class WishesService {

  private url: string = environment.serverUrl;

  public getActiveUser(userId: number): Promise<any> {

    const idObj = { id: userId };

    return axios
            .post(`${this.url}api/wishes/getActiveUser`, idObj)
            .then(response => {
              return response.data[0];
            });
  };

  public getAllUsers(): Promise<any> {

    return axios
            .get(`${this.url}api/wishes/getAllUsers`)
            .then(response => {
              return response.data;
            });
  };

  public getWishes(userId: number): Promise<any> {

    const idObj = { id: userId };

    return axios
            .post(`${this.url}api/wishes/getWishes`, idObj)
            .then(response => {
              return response.data;
            });
  };
}
