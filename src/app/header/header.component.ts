import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataprocessService } from '../dataprocess.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userName: any = '';
  public flag: boolean = false;


  constructor(private auth: AuthService, private ds: DataprocessService) { }

  ngOnInit() {
    this.flag = this.auth.checkKey();
    this.userName = this.auth.getName();

    this.ds.obj_subject_for_name.subscribe(
      (response) => {
        console.log(response);
        if (response['user_name'] != "") {
          this.userName = response['user_name'];
          this.flag = true;
        } else {
          this.userName = "";
          // this.flag1 = true;
          this.flag = false;
        }
      }
    )
  }

}
