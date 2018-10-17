import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Injectable()
export class WishesService {

  private url: string = environment.serverUrl;

  public getActiveUser(userId: number): Promise<any> {

    const body = { id: userId };

    return axios
            .post(`${this.url}api/wishes/getActiveUser`, body)
            .then(response => {
              return response.data[0];
            });
  }

  public getAllUsers(): Promise<any> {

    return axios
            .get(`${this.url}api/wishes/getAllUsers`)
            .then(response => {
              return response.data;
            });
  }

  public getWishes(userId: number): Promise<any> {

    const body = { id: userId };

    return axios
            .post(`${this.url}api/wishes/getWishes`, body)
            .then(response => {
              return response.data;
            });
  }

  public reserveWish(reservedUserId: number, wishId: number, wisheUserId: number): Promise<any> {

    const body = {
      reservedUserId: reservedUserId,
      wishId: wishId,
      wisheUserId: wisheUserId
     };

    return axios
            .post(`${this.url}api/wishes/reserveWish`, body)
            .then(response => {
              return response.data;
            });
  }

  public releaseWish(wishId: number, wisheUserId: number): Promise<any> {

    const body = {
      wishId: wishId,
      wisheUserId: wisheUserId
     };

    return axios
            .post(`${this.url}api/wishes/releaseWish`, body)
            .then(response => {
              return response.data;
            });
  }
}
