import {Injectable,EventEmitter} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/take';

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) {
    }



}
