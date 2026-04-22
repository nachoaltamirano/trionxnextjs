# TRIONX - E-Commerce de Indumentaria Deportiva para Triatlón

Tienda online de alto rendimiento para TRIONX, marca especializada en indumentaria técnica para triatletas profesionales.

## 🎯 Características

- **Catálogo dinámico**: 12 productos organizados en 4 categorías (Natación, Ciclismo, Running, Accesorios)
- **Gestión de carrito**: Zustand para estado global con persistencia en localStorage
- **Integración MercadoPago**: Checkout Pro para pagos seguros
- **Sistema de stock**: Gestión de inventario en JSON con actualización en tiempo real
- **Diseño responsivo**: Mobile-first con Tailwind CSS
- **TypeScript strict**: Tipado completo para seguridad en desarrollo
- **Sponsor Banner**: Identificación como sponsor oficial de Iron Team Argentina

## 🛠️ Stack Técnico

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript (strict mode)
- **Estilos**: Tailwind CSS
- **Base de datos**: JSON internal (`/src/data/`)
- **Pagos**: MercadoPago Checkout Pro
- **Estado**: Zustand
- **Imágenes**: next/image con blur placeholders
- **Iconos**: lucide-react

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── layout.tsx               # Layout root con Navbar y Footer
│   ├── page.tsx                 # Home con hero slider
│   ├── productos/
│   │   ├── page.tsx             # Catálogo filtrable
│   │   └── [slug]/page.tsx      # Detalle de producto
│   ├── carrito/page.tsx         # Carrito de compras
│   ├── checkout/
│   │   ├── page.tsx             # Checkout con MercadoPago
│   │   ├── success/page.tsx     # Confirmación exitosa
│   │   ├── failure/page.tsx     # Pago rechazado
│   │   └── pending/page.tsx     # Pago pendiente
│   └── api/
│       ├── products/route.ts    # GET productos con filtro
│       ├── stock/route.ts       # GET/PATCH stock
│       ├── checkout/route.ts    # POST crear preferencia MP
│       └── webhooks/
│           └── mercadopago/route.ts  # Webhook de MP
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSlider.tsx       # Slider de 3 slides
│   │   └── CategoryFilter.tsx   # Filtro por categoría
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── ProductDetail.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartDrawer.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── SponsorBanner.tsx
├── data/
│   ├── products.json            # Catálogo
│   └── stock.json               # Estado de stock
├── lib/
│   ├── mercadopago.ts           # Config de MP
│   ├── products.ts              # Helpers de productos
│   └── stock.ts                 # Gestión de stock
├── store/
│   └── cartStore.ts             # Zustand cart store
└── types/
    └── index.ts                 # TypeScript interfaces
```

## 🚀 Instalación y Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
# MercadoPago Configuration
MP_ACCESS_TOKEN=your_mercadopago_access_token_here
MP_PUBLIC_KEY=your_mercadopago_public_key_here

# Base URL for webhooks and redirects
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Obtener credenciales de MercadoPago:**
1. Crear cuenta en https://www.mercadopago.com.ar
2. Ir a [Cuenta > Credenciales](https://www.mercadopago.com.ar/developers/panel/credentials)
3. Copiar el Access Token y Public Key

### 3. Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📦 Productos Disponibles

### Natación (3)
- Traje de triatlón Pro - $89,990
- Gafas HydroX - $24,990
- Gorro silicona Trionx - $12,490

### Ciclismo (3)
- Calza ciclismo Aero - $54,990
- Jersey manga larga Race - $39,990
- Guantes aero - $17,990

### Running (3)
- Remera técnica running - $19,990
- Short 2 en 1 - $34,990
- Medias de compresión - $22,990

### Accesorios (3)
- Cinturón de hidratación - $14,990
- Gorra running - $9,990
- Lentes deportivos UV - $29,990

## 🎨 Diseño

**Paleta de colores:**
- Primario: #0d1117 (Oscuro)
- Acento: #378ADD (Azul atlético)
- Texto: #f0f0f0 (Claro)
- Fondo: Blanco/Gris suave

**Tipografía:** Inter (Google Fonts)

## 🛒 Flujo de Compra

1. **Explorar**: Navegar por categorías o buscar productos
2. **Seleccionar**: Elegir talle y cantidad
3. **Carrito**: Agregar items al carrito (persistente)
4. **Checkout**: Llenar datos de envío
5. **Pago**: Redirigir a MercadoPago Checkout Pro
6. **Confirmación**: Página de éxito con número de orden

## 📊 Gestión de Stock

El stock se gestiona en `/src/data/stock.json`:

- **GET `/api/stock?productId=xxx`**: Obtener stock de un producto
- **PATCH `/api/stock`**: Actualizar stock manualmente

Ejemplo de actualización:
```bash
curl -X PATCH http://localhost:3000/api/stock \
  -H "Content-Type: application/json" \
  -d '{"productId":"traje-triatlon-pro","size":"M","delta":-1}'
```

## 🔐 Seguridad

- TypeScript strict mode para catching de errores
- Validación de stock antes de crear preferencia
- Manejo de errores en APIs
- CORS y seguridad de webhook

## 📱 Responsive Design

- **Mobile**: 1-2 columnas, menu hamburguesa
- **Tablet**: 2-3 columnas
- **Desktop**: 3-4 columnas

## ⚙️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm start

# Linting
npm run lint

# TypeScript check
npx tsc --noEmit
```

## 🚨 Notas Importantes

- Las imágenes de productos actualmente apuntan a URLs placeholder (`/images/products/...`)
- El sistema de stock es en JSON; en producción migrar a una base de datos real
- MercadoPago requiere HTTPS en producción
- El webhook de MP necesita ser registrado en el dashboard de MercadoPago

---

**Versión**: 1.0.0  
**Última actualización**: 2025  
**Sponsor Oficial**: Iron Team Argentina - Iron Man 70.3
