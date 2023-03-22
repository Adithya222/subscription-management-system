import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private httpClient: HttpClient,

  ) {

  }

  uploadFiles(formData: any, headers: any) {
    return this.httpClient.post('api/upload/uploadFile', formData, {headers: headers});
  }

}
