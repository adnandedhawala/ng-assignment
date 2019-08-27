import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DataprocessService } from '../dataprocess.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public msg: string;

  constructor(private route: Router, private formbuilder: FormBuilder, private ds: DataprocessService, private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  LoginData(formdata: NgForm) {
    // console.log(formdata);
    let checkEmail = formdata.value.userEmail;
    let checkPassword = formdata.value.userPassword;

    this.ds.getData("user").subscribe(
      (response) => {
        let flag: boolean = false;
        // console.log(response);
        for (let key in response) {
          // console.log(response[key].userEmail);
          if (checkEmail == response[key].userEmail && checkPassword == response[key].userPassword) {
            this.auth.storeKey({
              userName: response[key].userFirstName,
              userEmail: response[key].userEmail,
              userMobile: response[key].userMobile,
              id: response[key].id,
            });
            flag = true;
            break;
          }
        }
        if(!flag){
          this.msg = "Invalid Credentials";
        }else{
          let nameData = this.auth.getName();
          // console.log(nameData);
          this.ds.passName({user_name:nameData});
          this.route.navigate(['/']);
        }
      },
      (error) => {
        console.log(error);
      }
    )

  }
}
