import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MustMatch } from '../customValidations/confirmPassword';
import { UserSchema } from '../model/user.model';
import { DataprocessService } from '../dataprocess.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private ds:DataprocessService,private route:Router) {
    // this.registerForm = formBuilder.group({
    //   userFirstName: new FormControl(),
    //   userLastName: new FormControl(),
    //   userEmail: new FormControl(),
    //   userPassword: new FormControl(),
    //   userConfirmPassword: new FormControl(),
    // });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userFirstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      userLastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      userEmail: ['', [Validators.required,Validators.email]],
      userMobile:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]],
      userPassword: ['', [Validators.required,Validators.minLength(4)]],
      userConfirmPassword: ['', [Validators.required]]
    },
    {
      validator:MustMatch('userPassword','userConfirmPassword')
    });

  }
  RegisterData(formData: NgForm) {
    // console.log(formData);
    delete formData.value.userConfirmPassword;
    let userData:UserSchema = formData.value;
    // console.log(userData);
    this.ds.insertData(userData,"user").subscribe(
      (response)=>{
        // console.log(response);
        alert("user Added");
        this.route.navigate(['/loginPage']);



        // let message:string = "Congratulations on Registering to the network!";
        // var url = `http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=91${userData.userMobile}&authkey=290273ALycEkfI5d5b87b4&encrypt=&message=${message}`;
        // this.ds.smsApiProcess(url).subscribe(
        //   (response) => {
        //     console.log(response);
        //   }
        // )
      },
      (error)=>{
        console.log(error);
      }
    );

  }
}
