# Configuración de Webhooks de MercadoPago

## Conceptos Básicos

Los webhooks permiten que MercadoPago notifique a tu aplicación cuando ocurren eventos importantes (pagos aprobados, rechazados, etc.). Esto es esencial para:

- Actualizar el estado de los pedidos
- Reservar stock después del pago
- Enviar confirmaciones de compra
- Registrar transacciones en tu base de datos

## URL del Webhook

Tu webhook está alojado en:

```
https://your-domain.com/api/webhooks/mercadopago
```

### En Desarrollo Local

Para usar MercadoPago en desarrollo local con webhooks, necesitas un servicio de tunelización como **ngrok**:

#### 1. Instalar ngrok (solo una vez)

```bash
# Descarga desde https://ngrok.com/download
# O en Windows con Chocolatey:
choco install ngrok
```

#### 2. Ejecutar ngrok en otra terminal

```bash
ngrok http 3000
```

Esto te mostrará una URL pública como: `https://abc123xyz.ngrok.io`

Tu webhook será: `https://abc123xyz.ngrok.io/api/webhooks/mercadopago`

## Configurar el Webhook en el Dashboard de MercadoPago

### Paso 1: Acceder al Dashboard

1. Inicia sesión en [MercadoPago Developers](https://www.mercadopago.com.ar/developers)
2. Ve a **Mis Aplicaciones** → Selecciona tu aplicación

### Paso 2: Configurar Webhooks

1. En la sección izquierda, ve a **Configuración** → **Webhooks**
2. Haz clic en **+ Agregar webhook**

### Paso 3: Registrar la URL

Completa el formulario:

- **URL**: `https://your-domain.com/api/webhooks/mercadopago`
  - En desarrollo: `https://abc123xyz.ngrok.io/api/webhooks/mercadopago`
  
- **Tipo de Notificación**: Selecciona los eventos que quieres recibir:
  - ✅ `payment` (Principal - para pagos)
  - ✅ `merchant_order` (Alternativo)

### Paso 4: Verificar Configuración

1. Haz clic en **Guardar**
2. Verás el webhook listado con su **estado**
3. Puedes hacer clic en el webhook para ver:
   - Historial de entregas
   - Eventos recibidos
   - Errores si los hay

## Estructura de las Notificaciones

MercadoPago envía notificaciones POST con este formato:

```json
{
  "id": 123456789,
  "live_mode": true,
  "type": "payment",
  "date_created": "2024-01-15T10:00:00Z",
  "user_id": 123456,
  "retry": 0,
  "version": 0,
  "api_version": "v1",
  "action": "payment.updated",
  "data": {
    "id": "9876543210",
    "object": {
      "id": "payment_id",
      "type": "payment"
    }
  },
  "topic": "payment"
}
```

### Tipos de Eventos Principales

El webhook recibirá notificaciones cuando ocurran estos eventos:

| Evento | Descripción |
|--------|-------------|
| `payment.created` | Se creó un pago (aún no confirmado) |
| `payment.updated` | El estado del pago cambió |
| `merchant_order.created` | Se creó una orden de compra |
| `merchant_order.updated` | Cambió el estado de la orden |

### Estados de Pago

Cuando recibas `payment.updated`, el `data.status` puede ser:

| Estado | Significado |
|--------|------------|
| `pending` | Pago en proceso |
| `approved` | ✅ Pago aprobado |
| `rejected` | ❌ Pago rechazado |
| `cancelled` | Pago cancelado por el usuario |
| `refunded` | Reembolsado |

## Implementación en el Código

Tu webhook está en `/src/app/api/webhooks/mercadopago/route.ts` y maneja:

### 1. Pago Aprobado
```typescript
if (data.status === 'approved') {
  // Reserva stock
  // Crea/confirma la orden
  // Envía email de confirmación
}
```

### 2. Pago Rechazado
```typescript
if (data.status === 'rejected') {
  // Rechaza la orden
  // Libera stock reservado
  // Notifica al cliente
}
```

### 3. Pago Pendiente
```typescript
if (data.status === 'pending') {
  // Mantén la orden en estado pendiente
  // Espera confirmación futura
}
```

## Testing del Webhook en Desarrollo

### Opción 1: Usar Sandbox de MercadoPago

MercadoPago proporciona credenciales de prueba para testing:

1. En el Dashboard → Sección **Credenciales**
2. Hay dos conjuntos:
   - **Credentials** (Sandbox) - Para pruebas
   - **Production** - Para producción

### Opción 2: Simular una Notificación Localmente

Con `curl` o Postman, simula una notificación:

```bash
curl -X POST http://localhost:3000/api/webhooks/mercadopago \
  -H "Content-Type: application/json" \
  -d '{
    "action": "payment.updated",
    "data": {
      "id": "test_payment_123",
      "status": "approved",
      "preference_id": "preference_123"
    }
  }'
```

### Opción 3: Test con ngrok

1. Ejecuta ngrok en terminal: `ngrok http 3000`
2. Copia la URL: `https://abc123xyz.ngrok.io`
3. Registra en el dashboard: `https://abc123xyz.ngrok.io/api/webhooks/mercadopago`
4. Realiza un pago de prueba con credenciales sandbox
5. El webhook recibirá la notificación en tiempo real

Ver logs en Terminal:
```bash
# Terminal donde ejecutas `npm run dev`
# Verás: "MercadoPago Webhook received: {...}"
```

## Depuración

### Los Logs están en tu terminal:

```
MercadoPago Webhook received: {...}
Payment 9876543210 updated to status: approved
Order ORD-1234567890 updated successfully
Stock reserved for order: ORD-1234567890
```

### Ver Entregas de Webhook en MercadoPago

1. Dashboard → Webhooks → Selecciona tu webhook
2. Haz clic en **Historial**
3. Verás todas las notificaciones enviadas
4. Puedes hacer clic en cada una para ver:
   - Payload enviado
   - Respuesta recibida
   - Timestamp
   - Estado (éxito/error)

## Consideraciones de Seguridad

### En Producción:

1. **HTTPS requerido**: MercadoPago solo envía a URLs HTTPS
2. **Validar IP**: Verifica que las notificaciones vengan de MercadoPago (opcional pero recomendado)
3. **Validar firma**: Implementa verificación de firma SHA256 (recomendado)
4. **Manejo de duplicados**: Implementa idempotencia (check si ya procesaste este paymentId)
5. **Rate limiting**: Implementa límites de tasa para proteger contra abuse

### Validación de Firma (Recomendado)

MercadoPago envía un header `X-Signature` con cada webhook. Puedes validarlo así:

```typescript
import crypto from 'crypto';

export async function POST(request: Request) {
  const signature = request.headers.get('X-Signature');
  const requestId = request.headers.get('X-Request-Id');
  const body = await request.text();

  const secret = process.env.MP_WEBHOOK_SECRET;
  
  // Validar firma
  const hash = crypto
    .createHmac('sha256', secret || '')
    .update(body)
    .digest('hex');

  if (hash !== signature) {
    console.error('Invalid webhook signature');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Procesar webhook
}
```

## Checklist de Configuración

- [ ] Obtuviste tus credenciales de API (MP_ACCESS_TOKEN y MP_PUBLIC_KEY)
- [ ] Configuraste las variables de entorno en `.env.local`
- [ ] En desarrollo, instalaste y ejecutas ngrok
- [ ] Registraste la URL del webhook en el dashboard de MercadoPago
- [ ] Completaste un pago de prueba con credenciales sandbox
- [ ] Viste la notificación del webhook en tu terminal
- [ ] El estado de la orden se actualizó a "approved"
- [ ] El stock se reservó correctamente

## Endpoints Relacionados

- **POST /api/checkout** - Crea la preferencia de pago
- **POST /api/webhooks/mercadopago** - Recibe notificaciones
- **GET /api/products** - Lista productos
- **PATCH /api/stock** - Actualiza stock

## Recursos Útiles

- [Documentación Oficial - Webhooks MercadoPago](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/your-integrations/notifications)
- [ngrok Documentation](https://ngrok.com/docs)
- [MercadoPago API Reference](https://www.mercadopago.com.ar/developers/es/reference)
- [Testing MercadoPago Integration](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/your-integrations/test-checkout)
