import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product = { name: '', price: 0, stock: 0, fechas: {} };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  saveProduct() {
    if (!this.selectedProduct.name) return;

    if (this.selectedProduct.id) {
      this.productService
        .updateProduct(this.selectedProduct.id, this.selectedProduct)
        .then(() => {
          this.resetForm();
          this.loadProducts();
        });
    } else {
      this.productService.addProduct(this.selectedProduct).then(() => {
        this.resetForm();
        this.loadProducts();
      });
    }
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).then(() => this.loadProducts());
  }

  editProduct(product: Product) {
    this.selectedProduct = { ...product };
  }

  resetForm() {
    this.selectedProduct = { name: '', price: 0, stock: 0, fechas: {} };
  }
}
