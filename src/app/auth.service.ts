import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  storeKey(data) {
    localStorage.setItem("name", data.userName);
    localStorage.setItem("email", data.userEmail);
    localStorage.setItem("id", data.id);
    localStorage.setItem("mobile", data.userMobile);
  }

  deleteKey() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("mobile");
  }

  getName(){
    return localStorage.getItem("name");
  }

  checkKey(){
    return (localStorage.getItem("name")=== null)? false: true;
  }
}
