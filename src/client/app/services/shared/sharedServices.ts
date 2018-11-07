import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Injectable()
export class SharedService {
  private url: string = environment.serverUrl;

  public getUser(userId: number): Promise<any> {
    const idObj = {
      id: userId
    };
    return axios
            .post(`${this.url}api/shared/getuser`, idObj)
            .then(response => {
              return response.data;
            });
  }

  public getAdmin(): Promise<any> {
    return axios
            .get(`${this.url}api/shared/getAdmin`)
            .then(response => {
              return response.data;
            });
  }
}
