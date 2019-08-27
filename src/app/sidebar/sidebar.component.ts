import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataprocessService } from '../dataprocess.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService,private ds:DataprocessService) { }
  public flag1: boolean = false;
  public flag2: boolean = true;

  ngOnInit() {
    this.flag1 = this.auth.checkKey();
    this.flag2 = !this.flag1;

    this.ds.obj_subject_for_name.subscribe(
      (response) => {
        console.log(response);
        if (response['user_name'] != "") {
          // this.userName = response['user_name'];
          this.flag1 = true;
          this.flag2 = false;
        } else {
          // this.userName = "";
          // this.flag1 = true;
          this.flag1 = false;
          this.flag2 = true;
        }
      }
    )
  }

}
