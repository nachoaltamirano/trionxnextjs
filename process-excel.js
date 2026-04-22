const XLSX = require('xlsx');
const fs = require('fs');

const wb = XLSX.readFile('PRECIOS TRIONX.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws);

// Función para generar slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Cargar productos existentes
const existingProducts = JSON.parse(fs.readFileSync('src/data/products.json', 'utf-8'));

// Nuevos productos a agregar
const newProducts = [
  // GARMONT
  {
    id: 'bolso-logo-mistega',
    slug: 'bolso-logo-mistega',
    name: 'Bolso Logo MISTEGA',
    description: 'Bolso deportivo con logo MISTEGA. Diseño versátil para llevar tus accesorios deportivos.',
    price: 140000,
    category: 'garmont',
    images: ['/images/products/bolso-mistega.jpg'],
    sizes: ['UNICA'],
    stock: { 'UNICA': 10 },
    featured: false,
    badge: null
  },
  {
    id: 'bolso-logo-trionx',
    slug: 'bolso-logo-trionx',
    name: 'Bolso Logo TRIONX',
    description: 'Bolso deportivo con logo TRIONX. Perfecto para transportar tus equipos de entrenamiento.',
    price: 140000,
    category: 'garmont',
    images: ['/images/products/bolso-trionx.jpg'],
    sizes: ['UNICA'],
    stock: { 'UNICA': 8 },
    featured: false,
    badge: null
  },
  {
    id: 'campera-pumori-hombre-negra',
    slug: 'campera-pumori-hombre-negra',
    name: 'Campera Pumori Hombre Negra',
    description: 'Campera Pumori para hombre en color negro. Diseño moderno y resistente.',
    price: 260000,
    category: 'garmont',
    images: ['/images/products/campera-pumori-negra.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 10, 'M': 14, 'L': 4 },
    featured: true,
    badge: null
  },
  {
    id: 'campera-pumori-hombre-roja',
    slug: 'campera-pumori-hombre-roja',
    name: 'Campera Pumori Hombre Roja',
    description: 'Campera Pumori para hombre en color rojo. Estilo deportivo de alto rendimiento.',
    price: 260000,
    category: 'garmont',
    images: ['/images/products/campera-pumori-roja.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 4, 'M': 6, 'L': 2 },
    featured: true,
    badge: null
  },
  {
    id: 'campera-pumori-mujer-negra',
    slug: 'campera-pumori-mujer-negra',
    name: 'Campera Pumori Mujer Negra',
    description: 'Campera Pumori para mujer en color negro. Ajuste femenino y confortable.',
    price: 260000,
    category: 'garmont',
    images: ['/images/products/campera-pumori-mujer-negra.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 3, 'M': 3, 'L': 0 },
    featured: true,
    badge: null
  },
  {
    id: 'campera-pumori-mujer-salmon',
    slug: 'campera-pumori-mujer-salmon',
    name: 'Campera Pumori Mujer Salmon',
    description: 'Campera Pumori para mujer en color salmón. Diseño elegante y funcional.',
    price: 260000,
    category: 'garmont',
    images: ['/images/products/campera-pumori-salmon.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 3, 'M': 3, 'L': 0 },
    featured: true,
    badge: null
  },
  {
    id: 'remera-penon-colorado-hombre-azul',
    slug: 'remera-penon-colorado-hombre-azul',
    name: 'Remera Peñón Colorado Hombre Azul',
    description: 'Remera Peñón Colorado para hombre en color azul. Material transpirable.',
    price: 40000,
    category: 'garmont',
    images: ['/images/products/remera-penon-azul.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 1, 'M': 5, 'L': 2 },
    featured: false,
    badge: null
  },
  {
    id: 'remera-penon-colorado-hombre-gris',
    slug: 'remera-penon-colorado-hombre-gris',
    name: 'Remera Peñón Colorado Hombre Gris',
    description: 'Remera Peñón Colorado para hombre en color gris. Confortable y duradera.',
    price: 40000,
    category: 'garmont',
    images: ['/images/products/remera-penon-gris.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 1, 'M': 5, 'L': 2 },
    featured: false,
    badge: null
  },
  {
    id: 'remera-penon-colorado-hombre-terracota',
    slug: 'remera-penon-colorado-hombre-terracota',
    name: 'Remera Peñón Colorado Hombre Terracota',
    description: 'Remera Peñón Colorado para hombre en color terracota. Estilo y comodidad.',
    price: 40000,
    category: 'garmont',
    images: ['/images/products/remera-penon-terracota.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 2, 'M': 4, 'L': 2 },
    featured: false,
    badge: null
  },
  {
    id: 'remera-penon-colorado-mujer-rosa',
    slug: 'remera-penon-colorado-mujer-rosa',
    name: 'Remera Peñón Colorado Mujer Rosa',
    description: 'Remera Peñón Colorado para mujer en color rosa. Ajuste femenino cómodo.',
    price: 40000,
    category: 'garmont',
    images: ['/images/products/remera-penon-rosa.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 3, 'M': 4, 'L': 1 },
    featured: false,
    badge: null
  },
  {
    id: 'remera-penon-colorado-mujer-gris',
    slug: 'remera-penon-colorado-mujer-gris',
    name: 'Remera Peñón Colorado Mujer Gris',
    description: 'Remera Peñón Colorado para mujer en color gris. Versatilidad y comodidad.',
    price: 40000,
    category: 'garmont',
    images: ['/images/products/remera-penon-mujer-gris.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 3, 'M': 4, 'L': 1 },
    featured: false,
    badge: null
  },
  {
    id: 'remera-penon-colorado-mujer-terracota',
    slug: 'remera-penon-colorado-mujer-terracota',
    name: 'Remera Peñón Colorado Mujer Terracota',
    description: 'Remera Peñón Colorado para mujer en color terracota. Elegancia deportiva.',
    price: 40000,
    category: 'garmont',
    images: ['/images/products/remera-penon-mujer-terracota.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 3, 'M': 4, 'L': 1 },
    featured: false,
    badge: null
  },

  // PISTA
  {
    id: 'jersey-blanco-liso',
    slug: 'jersey-blanco-liso',
    name: 'Jersey Blanco Liso',
    description: 'Jersey ciclista blanco liso. Diseño minimalista y de alto rendimiento.',
    price: 50000,
    category: 'pista',
    images: ['/images/products/jersey-blanco.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 1, 'M': 5, 'L': 4 },
    featured: true,
    badge: null
  },
  {
    id: 'calza-negra-tria',
    slug: 'calza-negra-tria',
    name: 'Calza Negra Tria',
    description: 'Calza negra para triatlón. Diseño aerodinámico con badana de calidad.',
    price: 45000,
    category: 'pista',
    images: ['/images/products/calza-negra-tria.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 2, 'M': 2, 'L': 4 },
    featured: true,
    badge: null
  },
  {
    id: 'remera-verde-corta-femenina',
    slug: 'remera-verde-corta-femenina',
    name: 'Remera Verde Corta Femenina',
    description: 'Remera verde de manga corta para mujer. Ideal para pista y entrenamiento.',
    price: 30000,
    category: 'pista',
    images: ['/images/products/remera-verde-femenina.jpg'],
    sizes: ['S', 'M', 'L'],
    stock: { 'S': 6, 'M': 7, 'L': 7 },
    featured: true,
    badge: null
  },
  {
    id: 'gorra-ciclista-sicodelica',
    slug: 'gorra-ciclista-sicodelica',
    name: 'Gorra Ciclista Sicodélica',
    description: 'Gorra ciclista con diseño sicodélico. Protección y estilo en una sola prenda.',
    price: 10000,
    category: 'pista',
    images: ['/images/products/gorra-sicodelica.jpg'],
    sizes: ['UNICA'],
    stock: { 'UNICA': 3 },
    featured: false,
    badge: null
  },
  {
    id: 'medias-ciclismo-blanca',
    slug: 'medias-ciclismo-blanca',
    name: 'Medias Ciclismo Blanca',
    description: 'Medias de ciclismo en color blanco. Confort y transpirabilidad para largas distancias.',
    price: 7500,
    category: 'pista',
    images: ['/images/products/medias-ciclismo-blanca.jpg'],
    sizes: ['UNICA'],
    stock: { 'UNICA': 16 },
    featured: false,
    badge: null
  },
  {
    id: 'medias-ciclismo-negra',
    slug: 'medias-ciclismo-negra',
    name: 'Medias Ciclismo Negra',
    description: 'Medias de ciclismo en color negro. Resistentes y cómodas para competencia.',
    price: 7500,
    category: 'pista',
    images: ['/images/products/medias-ciclismo-negra.jpg'],
    sizes: ['UNICA'],
    stock: { 'UNICA': 16 },
    featured: false,
    badge: null
  },
  {
    id: 'porta-numeros',
    slug: 'porta-numeros',
    name: 'Porta Números',
    description: 'Porta números para ciclismo. Accesorio esencial para competencias.',
    price: 10000,
    category: 'pista',
    images: ['/images/products/porta-numeros.jpg'],
    sizes: ['UNICA'],
    stock: { 'UNICA': 10 },
    featured: false,
    badge: null
  },

  // GORRAS
  {
    id: 'gorra-deportiva-microfibra-blanca',
    slug: 'gorra-deportiva-microfibra-blanca',
    name: 'Gorra Deportiva Microfibra Blanca',
    description: 'Gorra deportiva de microfibra en color blanco. Material resistente y transpirable.',
    price: 20000,
    category: 'gorras',
    images: ['/images/products/gorra-microfibra-blanca.jpg'],
    sizes: ['UNICA'],
    stock: { 'UNICA': 4 },
    featured: true,
    badge: 'new'
  },
  {
    id: 'gorra-deportiva-microfibra-negra',
    slug: 'gorra-deportiva-microfibra-negra',
    name: 'Gorra Deportiva Microfibra Negra',
    description: 'Gorra deportiva de microfibra en color negro. Elegancia y funcionalidad.',
    price: 20000,
    category: 'gorras',
    images: ['/images/products/gorra-microfibra-negra.jpg'],
    sizes: ['UNICA'],
    stock: { 'UNICA': 3 },
    featured: true,
    badge: 'new'
  },
  {
    id: 'gorra-gabardina-negra',
    slug: 'gorra-gabardina-negra',
    name: 'Gorra Gabardina Negra',
    description: 'Gorra de gabardina en color negro. Material de calidad para uso diario.',
    price: 20000,
    category: 'gorras',
    images: ['/images/products/gorra-gabardina-negra.jpg'],
    sizes: ['UNICA'],
    stock: { 'UNICA': 3 },
    featured: false,
    badge: null
  },
  {
    id: 'gorra-gabardina-blanca',
    slug: 'gorra-gabardina-blanca',
    name: 'Gorra Gabardina Blanca',
    description: 'Gorra de gabardina en color blanco. Clásica y versátil para cualquier ocasión.',
    price: 20000,
    category: 'gorras',
    images: ['/images/products/gorra-gabardina-blanca.jpg'],
    sizes: ['UNICA'],
    stock: { 'UNICA': 3 },
    featured: false,
    badge: null
  }
];

// Combinar productos
const allProducts = {
  products: [...existingProducts.products, ...newProducts]
};

// Guardar en archivo
fs.writeFileSync('src/data/products.json', JSON.stringify(allProducts, null, 2));
console.log('✅ Productos actualizados exitosamente!');
console.log(`Total de productos: ${allProducts.products.length}`);
console.log(`Nuevos productos agregados: ${newProducts.length}`);
