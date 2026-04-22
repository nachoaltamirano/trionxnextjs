// MercadoPago Configuration
// Credentials are loaded from environment variables

export function initMercadoPago() {
  if (!process.env.MP_ACCESS_TOKEN) {
    console.warn('Warning: MercadoPago access token not configured in .env.local');
  }
  if (!process.env.MP_PUBLIC_KEY) {
    console.warn('Warning: MercadoPago public key not configured in .env.local');
  }
}

