import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

import {catchError, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {environment} from "../../../environments/environment";

/**
 * @author Denver Simonsz
 */
const httpOptions: any = {
    headers: new HttpHeaders(),
    responseType: 'json'
};


@Injectable()
export class HttpService {
    baseUrl = environment.baseUrl;

    constructor(
        private http: HttpClient,
        private keycloakService: KeycloakService
    ) {
    }

    httpGetNoAuth(url: any) {
        return this.http.get(`${this.baseUrl}${url}`)
            .pipe(
                tap(res => {
                    return res;
                }),
                catchError(this.handleError('res'))
            );
    }

    httpGet(url: any, customHeaders: any = {}) {
        // this.authorization();
        if (customHeaders && customHeaders.responseType) {
            httpOptions['responseType'] = 'blob' as 'json';
        }
        return this.http.get(`${this.baseUrl}${url}`, httpOptions)
            .pipe(
                tap(res => {
                    return res;
                }),
                catchError(res => {
                    return throwError(res.error);
                })
            );
    }

    httpGetAttachment(url: any) {
        let headers: HttpHeaders = new HttpHeaders();
        // headers = headers.append('Content-Type', 'application/json');
        // headers = headers.append('Authorization', 'Bearer ' + this.keycloakService.getKeycloakInstance().token);
        headers = headers.append('Authorization', 'Bearer ' + '');

        let options = {
            responseType: 'blob',
            headers: headers
        };

        // @ts-ignore
        return this.http.get(`${this.baseUrl}${url}`, options)
            .pipe(
                tap(res => {
                    return res;
                }),
                catchError(res => {
                    return throwError(res.error);
                })
            );
    }

    httpDelete(url: any) {
        this.authorization();
        return this.http.delete(`${this.baseUrl}${url}`, httpOptions)
            .pipe(
                tap(res => {
                    return res;
                }),
                catchError(this.handleError('res'))
            );
    }

    httpPostNoAuth(url: any, request: any) {
        return this.http.post(`${this.baseUrl}${url}`, request).pipe(
            tap(res => {
                return res;
            }),
            catchError(this.handleError('res'))
        );
    }

    httpPost(url: any, request: any, customHeaders: any = null) {
        this.authorization();
        if (customHeaders && customHeaders.responseType) {
            httpOptions['responseType'] = 'blob' as 'json';
        }
        return this.http.post(`${this.baseUrl}${url}`, request, httpOptions).pipe(
            tap(res => {
              return res;
            }),
            catchError(res => {
              return throwError(res.error);
            })
        );
    }

    httpPostPageable(url: any, request: any, start: any, size: any) {
        this.authorization();
        return this.http.post(`${this.baseUrl}${url}`, request, {...httpOptions, params: new HttpParams().set('start', start).set('size', size)}).pipe(
            tap(res => {
                return res;
            }),
            catchError(res => {
                return throwError(res.error);
            })
        );
    }

    httpPostFile(url: any, file: any) {
        let formdata: FormData = new FormData();

        formdata.append('file', file);

        let headers = new HttpHeaders();
        headers.append('enctype', 'multipart/form-data');
        headers = headers.append('Authorization', 'Bearer ' + this.keycloakService.getKeycloakInstance().token);


        const req = new HttpRequest('POST', url, formdata, {
            reportProgress: true,
            responseType: 'text',
            headers: headers
        });

        return this.http.request(req);
    }


    httpPut(url: any, request: any) {
        this.authorization();
        return this.http.put(`${this.baseUrl}${url}`, request, httpOptions).pipe(
            tap(res => {
                return res;
            }),
            catchError(res => {
                return throwError(res.error);
            })
        );
    }

    private log(message: string) {
        console.log(message);
    }

    authorization() {
        let headers: HttpHeaders = new HttpHeaders();
        // headers = headers.append('Content-Type', 'application/json');
        // headers = headers.append('Authorization', 'Bearer ');
        // headers = headers.append('Authorization', 'Bearer ' + this.keycloakService.getKeycloakInstance().token);
        httpOptions.headers = headers;
    }

    authorizationFile() {
        let headers: HttpHeaders = new HttpHeaders();
        // headers = headers.append('Authorization', 'Bearer ' + this.keycloakService.getKeycloakInstance().token);
        headers = headers.append('Authorization', 'Bearer ');
        httpOptions.headers = headers;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    httpPutNoAuth(url: string, data: any) {
        return this.http.put(`${this.baseUrl}${url}`, data).pipe(
            tap(res => {
                return res;
            }),
            catchError(this.handleError('res'))
        );
    }
}
