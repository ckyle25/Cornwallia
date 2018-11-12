import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Injectable()
export class SharedService {
  private url: string = environment.serverUrl;

  config = {
    withCredentials: true
  }

  public getUser(userId: number): Promise<any> {
    const idObj = {
      id: userId
    };
    return axios
            .post(`${this.url}api/shared/getuser`, idObj, this.config)
            .then(response => {
              return response.data;
            });
  }

  public requestAccess(content: string, userName: string): Promise<any> {

    const body = {
      content,
      userName
    };

    return axios
            .post(`${this.url}api/shared/requestAccess`, body, this.config)
            .then(response => {
              return response.data;
            });
  }

  public getAdmin(): Promise<any> {
    return axios
            .get(`${this.url}api/shared/getAdmin`, this.config)
            .then(response => {
              return response.data;
            });
  }

  public updateEdwUser(userId: number, email: string, isAdmin: number, wishes: number, lanParty: number, calendar: number, firstName: string, lastName: string, auth0Id: string): Promise<any> {
    const body = {
      userId,
      email,
      isAdmin,
      wishes,
      lanParty,
      calendar,
      firstName,
      lastName,
      auth0Id
    };

    return axios
            .put(`${this.url}api/shared/updateUser`, body, this.config)
            .then(response => {
              return response.data;
            });
  }
}
