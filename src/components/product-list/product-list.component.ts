import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { emptyProduct, Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ProductListComponent {
  products$: Observable<Product[]>;
  selectedProduct: Product = emptyProduct;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts();
  }

  saveProduct() {
    if (!this.selectedProduct.name) return;

    if (this.selectedProduct.id) {
      this.productService
        .updateProduct(this.selectedProduct.id, this.selectedProduct)
        .then(() => this.resetForm());
    } else {
      this.productService.addProduct(this.selectedProduct).then(() => {
        this.resetForm();
      });
    }
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id);
  }

  editProduct(product: Product) {
    this.selectedProduct = { ...product };
  }

  resetForm() {
    this.selectedProduct = emptyProduct;
  }
}
