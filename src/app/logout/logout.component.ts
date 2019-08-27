import { Component, OnInit } from '@angular/core';
import { DataprocessService } from '../dataprocess.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private ds:DataprocessService,private auth:AuthService,private route:Router) { }

  ngOnInit() {
    this.auth.deleteKey();
    this.ds.passName({user_name:""});
    this.route.navigate(['/loginPage']);
  }

}
