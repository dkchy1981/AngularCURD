import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Employee} from'./employee.model'
import {BrowserModule} from '@angular/platform-browser';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable()
export class EmployeeService {

  selectedEmployee : Employee;
  employeeList : Employee[];
  constructor(private http : Http) { }

  public postEmployee(emp : Employee){
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://brdnoodles/WebAPI/api/Employee',body,requestOptions).pipe(map(x => x));
  }

  public putEmployee(id, emp) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('http://brdnoodles/WebAPI/api/Employee/' + id,
      body,
      requestOptions).pipe(map(res => res.json()));
  }
  public getEmployeeList(){
    this.http.get('http://brdnoodles/WebAPI/api/Employee')
    .pipe(map((data : Response) =>{
      return data.json() as Employee[];
    })).toPromise().then(x => {
      this.employeeList = x;
    })
  }

  public deleteEmployee(id: number) {
    return this.http.delete('http://brdnoodles/WebAPI/api/Employee/' + id).pipe(map(res => res.json()));
  }
}
