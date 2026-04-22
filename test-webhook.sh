#!/bin/bash
# Test webhook locally without needing MercadoPago
# Run this script to simulate a webhook notification

echo "Testing webhook with payment approved status..."

curl -X POST http://localhost:3000/api/webhooks/mercadopago \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1001,
    "live_mode": false,
    "type": "payment",
    "date_created": "2024-01-15T10:00:00Z",
    "user_id": 123456,
    "retry": 0,
    "version": 0,
    "api_version": "v1",
    "action": "payment.updated",
    "data": {
      "id": "999999999",
      "object": {
        "id": "payment_id",
        "type": "payment"
      },
      "status": "approved",
      "preference_id": "YOUR_PREFERENCE_ID_HERE"
    },
    "topic": "payment"
  }'

echo ""
echo "Webhook test sent! Check your terminal running 'npm run dev' for logs."
