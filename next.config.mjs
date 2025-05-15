import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
  locales: ['en', 'ar', 'fr', 'de'],
  defaultLocale: 'en',
});

const nextConfig = {
  images: {
    domains: ['logo.clearbit.com'],
  },
};

export default withNextIntl(nextConfig);
