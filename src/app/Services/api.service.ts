import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
		private http: HttpClient
	) {   }
	
	private setHeaders(): HttpHeaders {
		let headersConfig = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		//	'Authorization': 'Bearer '+localStorage.getItem("Token")
		};
		return new HttpHeaders(headersConfig);
	}

	private setHeadersWithImage(): HttpHeaders {
		let headersConfig = {
			'Accept': 'application/json',
		};
		return new HttpHeaders(headersConfig);
  }
 
	get(path: string, params?: HttpParams){
		return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), params });
	}
	post(path: string, body: Object = {}) {
		return this.http.post(`${environment.api_url}${path}`, body, { headers: this.setHeaders() });
	}
	// update(path: string, body: Object = {}) {
	// 	return this.http.put(`${environment.api_url}${path}`, body, { headers: this.setHeaders() });
	// }
	// remove(path: string) {
	// 	return this.http.delete(`${environment.api_url}${path}`, { headers: this.setHeaders() });
	// }
	// upload(path: string, body: Object){
	// 	return this.http.post(`${environment.api_url}${path}`, body, { headers: this.setHeadersWithImage() });
	// }
	// removeAttachment(path: string) {
	// 	return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders() });
	// }


}
