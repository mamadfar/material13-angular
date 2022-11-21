import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @Output() onEdit = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productServices: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productServices.getProductsService().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => alert("Error While Fetching The Records!!")
    })
  };

  editProductHandler(row: any) {
    this.onEdit.emit(row);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
