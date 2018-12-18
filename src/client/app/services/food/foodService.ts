import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import axios from 'axios';

@Injectable()
export class FoodService {
  private url: string = environment.serverUrl;

  config = {
    withCredentials: true
  };

  public getActiveUser(userId: number): Promise<any> {

    const body = { id: userId };

    return axios
            .post(`${this.url}api/food/getActiveUser`, body, this.config)
            .then(response => {
              return response.data[0];
            });
  }
}
