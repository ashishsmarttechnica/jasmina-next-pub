import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Ubuntu_Sans } from "next/font/google";
import "rsuite/dist/rsuite-no-reset.min.css";
import "@/styles/globals.css";
import { CustomProvider } from "rsuite";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import QueryProvider from "@/providers/QueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Add CSS for styling the toast
import AppInit from "@/lib/AppInit";
import { Analytics } from "@vercel/analytics/next";

const ubuntu = Ubuntu_Sans({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  const rtlLocales = ["ar", "he", "fa", "ur"];
  const dir = rtlLocales.includes(locale) ? "rtl" : "ltr";

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={dir}>
      <body className={`${ubuntu.variable} antialiased`}>
        <CustomProvider>
          <QueryProvider>
            <NextIntlClientProvider>
              <AppInit />
              {children}
              <Analytics />
              <Footer />
            </NextIntlClientProvider>
          </QueryProvider>
        </CustomProvider>
        <ToastContainer
          position="bottom-left"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={rtlLocales.includes(locale)}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={true}
          theme="light"
        />
      </body>
    </html>
  );
}
