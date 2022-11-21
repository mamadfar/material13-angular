import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BaseURL: string = "http://localhost:3000"

  constructor(private http: HttpClient) {
  }

  createProductService(data: any) {
    return this.http.post<any>(`${this.BaseURL}/productList`, data)
  }

  getProductsService() {
    return this.http.get<any>(`${this.BaseURL}/productList`)
  };

  updateProductsService(data: any, id: number) {
    return this.http.put<any>(`${this.BaseURL}/productList/${id}`, data)
  };

  deleteProductsService(id: number) {
    return this.http.delete<any>(`${this.BaseURL}/productList/${id}`)
  };
}
