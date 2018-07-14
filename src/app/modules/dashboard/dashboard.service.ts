import {Injectable,EventEmitter} from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/take';

@Injectable()
export class DashboardService {
    private headers = new Headers();
    private storyUrl = 'api/teamstory';  // URL to web api
    private gameUrl='/api/game';
    private socket;
    public gameData: EventEmitter<any>;

    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
        this.gameData= new EventEmitter();
    }
    notifyGameData(gameData): void{
        this.gameData.emit(gameData);
    }
    getGames(options){
        let apiRequestUrl=this.storyUrl;
        if(Object.keys(options).length > 0){
            let queryString="";
            queryString+=options.sortby?"sortby="+options.sortby+"&":"";
            queryString+=options.sortorder?"sortorder="+options.sortorder+"&":"";
            queryString+=options.state?"state="+options.state+"&":"";
            queryString+=options.orstate?"orstate="+options.orstate+"&":"";
            apiRequestUrl=queryString?this.storyUrl+'?'+queryString:this.storyUrl;
        }

        return this.http.get(apiRequestUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getGamesObs(options):Observable<any>{
        let apiRequestUrl=this.storyUrl;
        if(Object.keys(options).length > 0){
            let queryString="";
            queryString+=options.sortby?"sortby="+options.sortby+"&":"";
            queryString+=options.sortorder?"sortorder="+options.sortorder+"&":"";
            queryString+=options.state?"state="+options.state+"&":"";
            apiRequestUrl=queryString?this.storyUrl+'?'+queryString:this.storyUrl;
        }
         return this.http.get(apiRequestUrl, {headers: this.headers})
            .map(response => response.json())
            .take(1)
            .catch(this.handleError);
    }

    getGameDetails(gameId){
        let apiRequestUrl=this.storyUrl+'/'+gameId;
        return this.http.get(apiRequestUrl,  {headers: this.headers})
            .toPromise()
            .then(response => response )
            .catch(this.handleError);
    }
    stepChanged(gameId,postArray){
        return this.http
            .put(this.gameUrl+'/skipsteps/'+gameId, postArray, {headers: this.headers})
            .toPromise()
            .then(res => res)
            .catch(this.handleError);
    }


    private handleError (error) {
        return error;
    }
}
