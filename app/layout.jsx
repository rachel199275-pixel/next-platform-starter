// app/layout.tsx
import './globals.css';
import 'aos/dist/aos.css'
import AOSInit from '../components/AOSInit'

export const metadata = {
  title: 'Rachel 蓓霖',
  description: '官網設計・SEO關鍵字・網站代管',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
       <body className="bg-white text-slate-900">
        <AOSInit />                 {/* ← 新增：初始化 AOS */}
        {children}
      </body>
    </html>
  )
}
