// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Rachel 蓓霖',
  description: '官網設計・SEO關鍵字・網站代管',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className="bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
