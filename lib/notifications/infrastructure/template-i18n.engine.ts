import { NotificationCategory } from '@/types/universal-notifications';
import { UNIVERSAL_NOTIFICATION_CONFIG } from '../domain/notification.constants';

export type SupportedLocale = 'tr' | 'en' | 'de';

interface CompiledTemplate {
  subject: string;
  body: string;
  actionUrl?: string;
}

// Fallback In-Memory Template Translations
const TEMPLATE_DICTIONARY: Record<string, Record<SupportedLocale, { subject: string; body: string; url?: string }>> = {
  OFFER_RECEIVED: {
    tr: {
      subject: 'Yeni Teklif Belgesi Alındı',
      body: 'Sayın {{fullName}}, {{vendorName}} firmasından {{amount}} TL tutarında yeni teklif aldınız.',
      url: '/cift?tab=offers'
    },
    en: {
      subject: 'New Offer Received',
      body: 'Dear {{fullName}}, you have received a new offer of {{amount}} TRY from {{vendorName}}.',
      url: '/cift?tab=offers'
    },
    de: {
      subject: 'Neues Angebot Erhalten',
      body: 'Sehr geehrte(r) {{fullName}}, Sie haben ein neues Angebot von {{vendorName}} erhalten.',
      url: '/cift?tab=offers'
    }
  },
  PAYMENT_DUE: {
    tr: {
      subject: 'Ödeme Hatırlatması',
      body: 'Sayın {{fullName}}, {{dueDate}} tarihli {{amount}} TL tutarındaki ödemenizin vakti yaklaştı.',
      url: '/cift?tab=budget'
    },
    en: {
      subject: 'Payment Due Reminder',
      body: 'Dear {{fullName}}, your payment of {{amount}} TRY is due on {{dueDate}}.',
      url: '/cift?tab=budget'
    },
    de: {
      subject: 'Zahlungserinnerung',
      body: 'Sehr geehrte(r) {{fullName}}, Ihre Zahlung ist fällig.',
      url: '/cift?tab=budget'
    }
  }
};

export class TemplateI18nEngine {
  static compile(
    templateCode: string,
    locale: string = UNIVERSAL_NOTIFICATION_CONFIG.DEFAULT_LOCALE,
    variables: Record<string, string | number | boolean>
  ): CompiledTemplate {
    const isSupported = (UNIVERSAL_NOTIFICATION_CONFIG.SUPPORTED_LOCALES as readonly string[]).includes(locale);
    const activeLocale: SupportedLocale = isSupported
      ? (locale as SupportedLocale)
      : (UNIVERSAL_NOTIFICATION_CONFIG.DEFAULT_LOCALE as SupportedLocale);

    const templateGroup = TEMPLATE_DICTIONARY[templateCode] || TEMPLATE_DICTIONARY.OFFER_RECEIVED;
    const template = templateGroup[activeLocale] || templateGroup.tr;

    return {
      subject: this.replacePlaceholders(template.subject, variables),
      body: this.replacePlaceholders(template.body, variables),
      actionUrl: template.url ? this.replacePlaceholders(template.url, variables) : undefined
    };
  }

  private static replacePlaceholders(
    rawText: string,
    vars: Record<string, string | number | boolean>
  ): string {
    let result = rawText;
    Object.entries(vars).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(value));
    });
    return result;
  }
}