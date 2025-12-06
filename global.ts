import messages from '@/locals/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
  }
}