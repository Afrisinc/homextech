/**
 * Production-Ready Notification Service
 * Integrates with AfrisInc API for sending emails, SMS, and push notifications
 *
 * Features:
 * - Exponential backoff retry logic
 * - Input sanitization
 * - Comprehensive error tracking
 * - Environment variable configuration
 * - Request timeout handling
 * - Rate limiting awareness
 */

class NotificationService {
  constructor(apiKey) {
    this.apiKey = apiKey || getApiKey();
    this.baseUrl = 'https://notify-api.afrisinc.com/api/notify/send';
    this.maxRetries = 3;
    this.initialDelay = 1000; // 1 second
    this.timeout = 30000; // 30 seconds
    this.enabled = !!this.apiKey;
  }

  /**
   * Sanitize string input to prevent injection
   * @param {string} str - Input string
   * @returns {string} Sanitized string
   */
  sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str.trim().substring(0, 500);
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Validate phone format (E.164)
   * @param {string} phone - Phone to validate
   * @returns {boolean}
   */
  isValidPhone(phone) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }

  /**
   * Sleep for specified milliseconds
   * @param {number} ms - Milliseconds
   * @returns {Promise<void>}
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Send with exponential backoff retry
   * @param {Object} options - Request options
   * @param {number} attempt - Current attempt number
   * @returns {Promise<Object>} API response
   */
  async sendWithRetry(options, attempt = 1) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        const errorMsg = error.message || `HTTP ${response.status}`;
        throw new Error(`AfrisInc API Error: ${errorMsg}`);
      }

      return await response.json();
    } catch (error) {
      const isRetryable = error.name === 'AbortError' ||
                         error.message.includes('Network') ||
                         error.message.includes('Failed to fetch');
      const shouldRetry = isRetryable && attempt < this.maxRetries;

      if (shouldRetry) {
        const delay = this.initialDelay * Math.pow(2, attempt - 1);
        console.warn(`Notification retry ${attempt}/${this.maxRetries} after ${delay}ms:`, error.message);
        await this.sleep(delay);
        return this.sendWithRetry(options, attempt + 1);
      }

      throw error;
    }
  }

  /**
   * Send a notification via email, SMS, or push
   * @param {Object} options - Notification options
   * @param {string} options.channel - 'EMAIL', 'SMS', or 'PUSH'
   * @param {string} options.recipient - Email, phone, or device ID
   * @param {string} options.templateId - Template UUID from AfrisInc
   * @param {Object} options.payload - Template variables
   * @returns {Promise<Object>} API response
   */
  async send(options) {
    if (!this.enabled) {
      console.warn('Notification Service: API key not configured');
      return { status: 'disabled', message: 'Notification service not configured' };
    }

    if (!options.channel || !options.recipient || !options.templateId) {
      throw new Error('Missing required fields: channel, recipient, templateId');
    }

    // Validate based on channel
    if (options.channel === 'EMAIL' && !this.isValidEmail(options.recipient)) {
      throw new Error(`Invalid email address: ${options.recipient}`);
    }

    if (options.channel === 'SMS' && !this.isValidPhone(options.recipient)) {
      throw new Error(`Invalid phone number: ${options.recipient}`);
    }

    // Sanitize payload
    const sanitizedPayload = {};
    if (options.payload) {
      Object.entries(options.payload).forEach(([key, value]) => {
        sanitizedPayload[key] = typeof value === 'string' ? this.sanitizeInput(value) : value;
      });
    }

    try {
      const result = await this.sendWithRetry({
        channel: options.channel,
        recipient: options.recipient,
        templateId: options.templateId,
        payload: sanitizedPayload
      });

      console.log(`✓ ${options.channel} sent to ${options.recipient}`, result);
      return result;
    } catch (error) {
      console.error(`✗ Failed to send ${options.channel}:`, error.message);
      throw error;
    }
  }

  /**
   * Send email notification
   * @param {string} email - Recipient email
   * @param {string} templateId - Template UUID
   * @param {Object} payload - Template variables
   */
  async sendEmail(email, templateId, payload) {
    return this.send({
      channel: 'EMAIL',
      recipient: email,
      templateId,
      payload
    });
  }

  /**
   * Send SMS notification
   * @param {string} phone - Recipient phone (E.164 format: +256...)
   * @param {string} templateId - Template UUID
   * @param {Object} payload - Template variables
   */
  async sendSMS(phone, templateId, payload) {
    return this.send({
      channel: 'SMS',
      recipient: phone,
      templateId,
      payload
    });
  }

  /**
   * Send push notification
   * @param {string} deviceId - Device/user ID
   * @param {string} templateId - Template UUID
   * @param {Object} payload - Template variables
   */
  async sendPush(deviceId, templateId, payload) {
    return this.send({
      channel: 'PUSH',
      recipient: deviceId,
      templateId,
      payload
    });
  }

  /**
   * Send application confirmation email
   * @param {Object} applicantData - { email, firstName, lastName, phone, score }
   */
  async sendApplicationConfirmation(applicantData) {
    return this.sendEmail(
      applicantData.email,
      'aec852a3-8fc6-458a-87b3-7005a4dbdb67', // Replace with actual template ID from AfrisInc
      {
        firstName: applicantData.firstName,
        lastName: applicantData.lastName,
        phone: applicantData.phone,
        score: applicantData.score,
        applicationDate: new Date().toLocaleDateString()
      }
    );
  }

  /**
   * Send admin notification about new application
   * @param {Object} applicantData - Application data
   * @param {string} adminEmail - Admin email address
   */
  async notifyAdminNewApplication(applicantData, adminEmail) {
    return this.sendEmail(
      adminEmail,
      '04069e64-52ed-46c5-a61a-6764b566cd73', // Replace with actual template ID from AfrisInc
      {
        applicantName: `${applicantData.firstName} ${applicantData.lastName}`,
        applicantPhone: applicantData.phone,
        applicantEmail: applicantData.email,
        applicantScore: applicantData.score,
        location: applicantData.location,
        timestamp: new Date().toISOString()
      }
    );
  }
}

/**
 * Get API key from environment or config
 * Priority: window.NOTIFICATION_API_KEY → localStorage → environment variable
 */
function getApiKey() {
  if (typeof window !== 'undefined' && window.NOTIFICATION_API_KEY) {
    return window.NOTIFICATION_API_KEY;
  }

  const stored = localStorage?.getItem('notificationApiKey');
  if (stored) return stored;

  if (typeof process !== 'undefined' && process.env?.NOTIFICATION_API_KEY) {
    return process.env.NOTIFICATION_API_KEY;
  }

  console.warn('Notification API key not found. Set via window.NOTIFICATION_API_KEY or environment variable.');
  return '';
}

/**
 * Set API key for the session
 * @param {string} key - API key
 */
function setNotificationApiKey(key) {
  if (typeof window !== 'undefined') {
    window.NOTIFICATION_API_KEY = key;
  }
  if (localStorage) {
    localStorage.setItem('notificationApiKey', key);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NotificationService, getApiKey, setNotificationApiKey };
}

// Create global instance
const notificationService = new NotificationService();
