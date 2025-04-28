import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private firestore: Firestore = inject(Firestore);

  getProducts(): Observable<Product[]> {
    return collectionData(collection(this.firestore, 'products'), {
      idField: 'id',
    }) as Observable<Product[]>;
  }

  addProduct(product: Product) {
    return addDoc(collection(this.firestore, 'products'), {
      ...product,
    });
  }

  deleteProduct(id: string) {
    return deleteDoc(doc(this.firestore, `products/${id}`));
  }

  updateProduct(id: string, product: Product) {
    const productRef = doc(this.firestore, `products/${id}`);
    return updateDoc(productRef, {
      ...product,
    });
  }
}
