# Test webhook locally without needing MercadoPago
# Run this script to simulate a webhook notification

Write-Host "Testing webhook with payment approved status..." -ForegroundColor Cyan

$preferenceId = Read-Host "Enter your preference ID (from the checkout)"

$payload = @{
    id = 1001
    live_mode = $false
    type = "payment"
    date_created = (Get-Date).ToString("O")
    user_id = 123456
    retry = 0
    version = 0
    api_version = "v1"
    action = "payment.updated"
    data = @{
        id = "999999999"
        object = @{
            id = "payment_id"
            type = "payment"
        }
        status = "approved"
        preference_id = $preferenceId
    }
    topic = "payment"
} | ConvertTo-Json

Write-Host "Sending payload:" -ForegroundColor Yellow
Write-Host $payload

$response = Invoke-RestMethod -Uri "http://localhost:3000/api/webhooks/mercadopago" `
    -Method POST `
    -ContentType "application/json" `
    -Body $payload

Write-Host "`nWebhook response:" -ForegroundColor Green
Write-Host ($response | ConvertTo-Json)

Write-Host "`nWebhook test sent! Check your terminal running 'npm run dev' for logs." -ForegroundColor Cyan
