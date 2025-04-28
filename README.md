# Tutorial CRUD Básico en Angular - SupermercadoApp

Este proyecto es un ejemplo de CRUD básico en Angular, ideal para estudiar para el examen de **Programación Web**. Utiliza Angular standalone components, Firebase (Firestore), y una arquitectura modular clara.

---

## 🌄 Iniciar el proyecto desde cero

### 1. Crear el proyecto Angular

```bash
npm install -g @angular/cli
ng new supermercado-app --standalone --routing --style=css
cd supermercado-app
```

### 2. Instalar Firebase y @angular/fire

```bash
npm install firebase @angular/fire
```

### 3. Crear el proyecto en Firebase

- Entra a [https://console.firebase.google.com](https://console.firebase.google.com)
- Crea un proyecto nuevo
- Añade una app web y copia la configuración
- Activa **Firestore** en el apartado "Build > Firestore Database"

### 4. Configurar `environment.ts`

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
  },
};
```

### 5. Configurar `app.config.ts`

```ts
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), provideFirestore(() => getFirestore())],
};
```

---

## 🚀 Lanzar la aplicación

```bash
ng serve
```

---

## 🌐 Estructura del proyecto

```bash
src/
├── app/
│   ├── pages/home/         # Vista principal
├── components/product-list/   # Componente CRUD principal
├── models/product.model.ts    # Interfaz de producto
├── services/product.service.ts # Acceso a Firestore
├── environments/environment.ts
```

---

## 🖊️ Crear un producto

1. Ve al formulario lateral.
2. Completa los campos: nombre, precio, stock, descripción y fechas.
3. Pulsa "Agregar".
4. El producto se guarda en Firestore y aparece en la tabla.

---

## ✏️ Editar un producto

1. Haz clic en "Editar" en la tabla.
2. El formulario se rellena con los datos.
3. Modifica lo que necesites.
4. Pulsa "Actualizar".

---

## ❌ Eliminar un producto

1. Haz clic en "Eliminar".
2. El producto se borra de Firestore.

---

## 🏙️ Firestore: Estructura de documento

```json
{
  "name": "Leche",
  "price": 1.25,
  "stock": 20,
  "description": "Leche desnatada",
  "fechas": {
    "caducidad": "2025-06-01",
    "fabricacion": "2025-04-01"
  }
}
```

---

## 📄 Model: `product.model.ts`

```ts
export interface Product {
  id?: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  fechas?: {
    caducidad: string;
    fabricacion: string;
  };
}
```

---

## 🚜 Servicio: `product.service.ts`

Utiliza funciones de Firebase para:

- `getProducts()` - leer productos
- `addProduct()` - crear
- `updateProduct()` - actualizar
- `deleteProduct()` - eliminar

Usa `collectionData()` y `addDoc()` con el nuevo SDK modular.

---

## 📅 Componente: `product-list.component.ts`

- Usa `ngModel` para enlace bidireccional.
- Tiene una tabla y un formulario lado a lado.
- Maneja el estado con `selectedProduct`.

---

## 🌈 Estilos globales (opcional)

```css
body {
  background-color: #f4f4f4;
  font-family: Arial, sans-serif;
}
.container {
  display: flex;
  gap: 2rem;
  padding: 2rem;
}
tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}
```

---

## 📅 Para estudiar

- Aprende bien `ngModel` y `*ngFor`
- Entiende cómo usar servicios y Firestore
- Practica formularios reactivos (como mejora)
- Revisa `provideFirebaseApp()` y `provideFirestore()` en `app.config.ts`

---

📄 **Repositorio preparado para examen de CRUD con Angular + Firebase**.

Listo para ampliar con login, roles, filtros o paginación si quieres subir de nivel.

---

🎨 Hecho para ayudarte a **aprobar fuerte y entender de verdad.**


```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read, write: if true;
    }
  }
}
```

```ts
<div class="container">
  <h2>Editar Producto</h2>

  <input [(ngModel)]="selectedProduct.name" placeholder="Nombre del Producto" />
  <input [(ngModel)]="selectedProduct.price" placeholder="Precio" type="number" />
  <input [(ngModel)]="selectedProduct.stock" placeholder="Stock" type="number" />
  <input [(ngModel)]="selectedProduct.description" placeholder="Descripción" />

  <h3>Tipos de Producto</h3>

  <!-- Input para agregar nuevo tipo -->
  <div class="new-tipo-form">
    <input [(ngModel)]="newTipoName" placeholder="Nuevo tipo..." />
    <button (click)="addTipo()">Agregar Tipo</button>
  </div>

  <!-- Lista de tipos existentes -->
  <ul>
    <li *ngFor="let tipo of selectedProduct.tipos">
      <input [(ngModel)]="tipo.name" placeholder="Nombre del tipo" />
      <button (click)="removeTipo(tipo.id)">Eliminar</button>
    </li>
  </ul>

  <!-- Guardar Producto -->
  <button (click)="saveProduct()">Guardar Producto</button>
</div>

```

## 🧠 Notas útiles Angular + Firestore (para examen)

---

### 🔥 Manejo de Arrays de Objetos en un Modelo

- Para listas dentro de un objeto (`tipos` en `Producto`):
  - Inicializar siempre en el modelo: `tipos: []`
  - Cada objeto debe tener `id` único (`crypto.randomUUID()` o `Date.now().toString()`).

```ts
tipos: [
  { id: '1', name: 'Bebida' },
  { id: '2', name: 'Lácteo' }
]
```

---

### ✏️ ngModel en Listas (`*ngFor`)

- Puedes usar `[(ngModel)]` directamente sobre propiedades de los objetos dentro de `*ngFor`.

```html
<li *ngFor="let tipo of selectedProduct.tipos">
  <input [(ngModel)]="tipo.name" />
</li>
```

- Si editas directamente, recuerda que **mutas** el array original.

---

### 🛡️ Cambios en Arrays

- Al modificar arrays (agregar, eliminar, actualizar):
  - Recomiendo **crear nueva referencia** para forzar el refresco en Angular:

```ts
this.selectedProduct.tipos = [...this.selectedProduct.tipos];
```

---

### 🚀 Guardar Datos con Subcolecciones / Arrays

- Firestore guarda arrays de objetos directamente sin problema.
- No necesitas hacer nada especial para arrays si están bien formados.

```ts
addDoc(collection(this.firestore, 'products'), {
  ...this.selectedProduct
});
```

---

### 📋 Estructura Básica CRUD Producto (Recordatorio Mental)

- **Modelo:** Definir `Product` y `Type`
- **Servicio:** Métodos `getProducts()`, `addProduct()`, `updateProduct()`, `deleteProduct()`
- **Componente:**
  - Mostrar lista de productos (`*ngFor`)
  - Formulario de edición (`[(ngModel)]`)
  - Botones de editar, guardar, eliminar

---

### 🧩 Importaciones necesarias

| Módulo | ¿Para qué? |
|:---|:---|
| `FormsModule` | `[(ngModel)]` |
| `CommonModule` | `*ngIf`, `*ngFor` |
| `provideFirebaseApp()` | Inicializar Firebase |
| `provideFirestore()` | Usar Firestore |

---

### ⚠️ Errores comunes a evitar

| Error | Solución |
|:---|:---|
| `ngModel` no funciona | Asegurar `FormsModule` importado |
| Firestore no conecta | Revisar `environment.ts` y `provideFirebaseApp()` |
| No se actualiza la UI después de cambios | Clonar array con `[...tipos]` |
| Permisos Firestore | Regla temporal para examen: `allow read, write: if true;` |

---

### 📄 Código express de agregar/eliminar tipo

```ts
newTipoName: string = '';

addTipo() {
  if (this.newTipoName.trim()) {
    this.selectedProduct.tipos.push({
      id: crypto.randomUUID(),
      name: this.newTipoName.trim()
    });
    this.newTipoName = '';
  }
}

removeTipo(id: string) {
  this.selectedProduct.tipos = this.selectedProduct.tipos.filter(t => t.id !== id);
}
```

---

### 🛠️ Buenas prácticas mínimas (para no fallar)

- Iniciar modelos vacíos (`emptyProduct`, `[]` en arrays).
- Manejar errores con `.catch()` si da tiempo.
- Confirmar acciones de borrado si se puede (por UX).
- Usar `console.log()` para debug si algo no aparece.

---

# 🧠 Frases rápidas para acordarme:

- **"Si hay ngModel, importa FormsModule."**
- **"Si hay datos de Firestore, usa async pipe."**
- **"Si cambio un array, hago spread [...array]."**
- **"Siempre inicializo objetos anidados."**
- **"Firestore guarda arrays y objetos directo."**

---

✅ **Fin de las notas.**  
🧠 **Listo para hacer CRUD con Firestore y Angular en cualquier momento.**

---

# 📚 (FIN README)

