import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataprocessService {

  private urlLink ='http://localhost:3000/';
  constructor(private http:HttpClient) { }

  getData(tableName:string){
    return this.http.get(this.urlLink+tableName);
  }

  insertData(record:any,tableName:string){
    return this.http.post(this.urlLink+tableName,record);
  }

  smsApiProcess(url:any){
    return this.http.get(url);
  }

  public obj_subject_for_name = new Subject();
  passName(data){
    this.obj_subject_for_name.next(data);
    // console.log(data);
  }

}
