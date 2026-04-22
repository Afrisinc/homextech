# Utils - Reusable Functions

## Notifications Service

Reusable notification function for sending emails, SMS, and push notifications via AfrisInc API.

### Setup

1. **Add API Key** (choose one method):

```javascript
// Method 1: Set globally in your HTML
<script>
  window.NOTIFICATION_API_KEY = 'sk_your_api_key_here';
</script>

// Method 2: Use environment variable
NOTIFICATION_API_KEY=sk_your_api_key_here

// Method 3: Set programmatically
setNotificationApiKey('sk_your_api_key_here');
```

2. **Include in your page**:

```html
<script src="utils/notifications.js"></script>
```

### Usage Examples

#### Send Email

```javascript
await notificationService.sendEmail(
  'user@example.com',
  'ee62bf5a-f672-444c-93a0-8d1620e69731',
  { firstName: 'John', lastName: 'Doe' }
);
```

#### Send SMS

```javascript
await notificationService.sendSMS(
  '+256701234567',
  'sms-template-id',
  { firstName: 'John', code: '123456' }
);
```

#### Send Push Notification

```javascript
await notificationService.sendPush(
  'device-id-123',
  'push-template-id',
  { title: 'New Message', message: 'You have a new application' }
);
```

#### Application Confirmation

```javascript
// Send confirmation to applicant
await notificationService.sendApplicationConfirmation({
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+256701234567',
  score: 85
});

// Notify admin
await notificationService.notifyAdminNewApplication(
  applicantData,
  'admin@officehometechx.com'
);
```

### API Reference

#### `send(options)`
Send a custom notification.

**Options:**
- `channel` (string): 'EMAIL', 'SMS', or 'PUSH'
- `recipient` (string): Email, phone, or device ID
- `templateId` (string): Template UUID from AfrisInc
- `payload` (object): Template variables

#### `sendEmail(email, templateId, payload)`
Send email notification.

#### `sendSMS(phone, templateId, payload)`
Send SMS notification.

#### `sendPush(deviceId, templateId, payload)`
Send push notification.

#### `sendApplicationConfirmation(applicantData)`
Send application confirmation email.

#### `notifyAdminNewApplication(applicantData, adminEmail)`
Notify admin about new application.

### Error Handling

```javascript
try {
  await notificationService.sendEmail(email, templateId, payload);
  console.log('Email sent successfully');
} catch (error) {
  console.error('Failed to send email:', error.message);
}
```

### Template IDs

Replace these with your actual template IDs from AfrisInc:

- **Application Confirmation**: `ee62bf5a-f672-444c-93a0-8d1620e69731`
- **Admin New Application**: `admin-new-application-template-id`
- **Other templates**: Get from your AfrisInc dashboard

### API Documentation

**Base URL**: `https://api.afrisinc.com/notify/send`

**Headers**:
- `Authorization: Bearer sk_your_api_key_here`
- `Content-Type: application/json`

**Body**:
```json
{
  "channel": "EMAIL",
  "recipient": "user@example.com",
  "templateId": "template-uuid",
  "payload": {
    "firstName": "John"
  }
}
```

**Response**:
```json
{
  "success": true,
  "messageId": "msg_123456",
  "timestamp": "2026-04-21T10:30:00Z"
}
```
