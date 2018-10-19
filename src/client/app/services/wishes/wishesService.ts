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

  public getFamilyReference(): Promise<any> {

    return axios
            .get(`${this.url}api/wishes/getFamilyReference`)
            .then(response => {
              return response.data;
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

  public reserveWish(reservedUserId: number, wishId: number): Promise<any> {

    const body = {
      reservedUserId: reservedUserId,
      wishId: wishId
     };

    return axios
            .post(`${this.url}api/wishes/reserveWish`, body)
            .then(response => {
              return response.data;
            });
  }

  public releaseWish(wishId: number): Promise<any> {

    const body = {
      wishId: wishId,
     };

    return axios
            .post(`${this.url}api/wishes/releaseWish`, body)
            .then(response => {
              return response.data;
            });
  }

  public addWish(userId: number, title: string, description: string, cost: number, link: string, rating: number): Promise<any> {

    const body = {
      userId,
      title,
      description,
      cost,
      link,
      rating
    };

    return axios
            .post(`${this.url}api/wishes/addWish`, body)
            .then(response => {
              return response.data;
            });
  }

  public deleteWish(wishId: number): Promise<any> {

    const body = {
      wishId: wishId,
     };

    return axios
            .post(`${this.url}api/wishes/deleteWish`, body)
            .then(response => {
              return response.data;
            });
  }

  public updateWish(title: string, description: string, cost: number, link: string, rating: number, wishId: number): Promise<any> {

    const body = {
      title,
      description,
      cost,
      link,
      rating,
      wishId
     };

    return axios
            .put(`${this.url}api/wishes/updateWish`, body)
            .then(response => {
              return response.data;
            });
  }
}
