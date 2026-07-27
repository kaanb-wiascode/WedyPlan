import { CreateCalendarEventDTO } from '@/types/enterprise-calendar';

export class IcsParser {
  /**
   * Generates RFC 5545 compliant .ics string for Apple, Google, and Outlook calendars
   */
  static generateIcsString(events: CreateCalendarEventDTO[]): string {
    const lines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//WedyPlan OS//Universal Calendar Engine//TR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    events.forEach((evt) => {
      const startFormatted = this.formatToIcsTime(evt.startTime);
      const endFormatted = this.formatToIcsTime(evt.endTime);

      lines.push('BEGIN:VEVENT');
      lines.push(`UID:evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}@wedyplan.com`);
      lines.push(`DTSTAMP:${this.formatToIcsTime(new Date().toISOString())}`);
      lines.push(`DTSTART:${startFormatted}`);
      lines.push(`DTEND:${endFormatted}`);
      lines.push(`SUMMARY:${this.escapeText(evt.title)}`);
      if (evt.description) lines.push(`DESCRIPTION:${this.escapeText(evt.description)}`);
      if (evt.location) lines.push(`LOCATION:${this.escapeText(evt.location)}`);
      lines.push('STATUS:CONFIRMED');
      lines.push('END:VEVENT');
    });

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }

  private static formatToIcsTime(isoString: string): string {
    return new Date(isoString)
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');
  }

  private static escapeText(text: string): string {
    return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  }
}