import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient
  ) {}

  request(method, url, data) {
    let observable;

    if (method === 'get') {
      observable = this.http.get(url, {
        params: data
      });
    } else if (method === 'post') {
      observable = this.http.post(url, data);
    }

    return observable.toPromise().then(res => {
      return new Promise((resolve, reject) => {
        if (res && res.errors) {
          reject(res);
        } else {
          resolve(res);
        }
      })
    });
  }

  get(url, data) {
    return this.request('get', url, data);
  }

  post(url, data) {
    return this.request('post', url, data);
  }

  createAccount(data) {
    return this.get('/api/create-account', data);
  }

  getBalance(data) {
    return this.get('/api/get-balance', data);
  }

  transfer(data) {
    return this.get('/api/transfer', data);
  }
}
