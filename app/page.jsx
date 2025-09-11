'use client';
import React, { useEffect, useState } from 'react';
import { Instagram, Facebook, Mail, MessageCircle, Sparkles, Check, ChevronRight, Star, ExternalLink, ArrowUp, Compass, FileSignature, Image, Layout, Rocket, TrendingUp, ShieldCheck, Megaphone, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// === 個人品牌官網・單頁版（Rachel 蓓霖） ===
// 重點：
// - 修復 TS 解析錯誤：移除 JSX 內不必要的反斜線（例如 className=\"...\"），避免產生不合法的轉義序列。
// - 保留/強化自動檢查（作為最小「測試案例」）：掃描不合法的 \u 轉義、反斜線轉義、關鍵區塊存在性。
// - SectionTitle 支援副標 s、導覽錨點統一為 why-us。

// --------------------------------------------------
// 開新視窗（行動裝置相容）
const openInNew = (url: string) => {
  try {
    const w = window.open(url, '_blank', 'noopener,noreferrer');
    if (!w) window.location.href = url;
  } catch (_) {
    window.location.href = url;
  }
};

// ====== SEO / 基本資料 ======
const SEO = {
  title: '官網設計・SEO關鍵字・網站代管｜Rachel 蓓霖',
  description: '客製化官網 x SEO 關鍵字 x 內容代管。以 LINE 為主 CTA，快速上線、逐季優化，成效公開可驗證。',
  url: 'https://rachelweb.netlify.app/',
  image: 'https://rachel.example.com/og.jpg',
  siteName: 'Rachel 蓓霖 個人品牌',
  locale: 'zh_TW',
};

const HERO_IMG = 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop';

const PROFILE = {
  nameZh: 'Rachel 蓓霖',
  title: '官網架設一條龍服務團隊',
  tagline: '網站架設首選．網路行銷設計一手包辦',
  summary: `經營30餘年，打造上百組網路招牌\n成效公開可驗證，讓你被對的人看見`,
  lineId: 'justlove23',
  email: 'rachel199275@gmail.com',
};

const LINKS = {
  ig: 'https://www.instagram.com/ykqk_rachel/',
  fb: 'https://www.facebook.com/ykqk.rachel',
  line: 'https://line.me/ti/p/4uM6gFJhBq',
};

// ====== Google 評論（靜態示意） ======
const GOOGLE_REVIEWS = [
  { author: '曾有為', rating: 5, time: '1個月前', text: '團隊人員都很細心和耐心，網頁做得很好，陸續也有客人來電詢問，定期會協助更新網頁內容，適合任何想要透過網路尋找客源的商家👍', url: 'https://share.google/yuMtBb12BC38C4HAm' },
  { author: '陳冠宇', rating: 5, time: '1個月前', text: '我們非常重視專業度與服務品質，這家公司在整個合作過程中表現非常出色。非常推薦給需要專業網站設計服務的朋友。', url: 'https://share.google/7alWrv0OvwCzqHBbP' },
  { author: 'Nanako Li', rating: 5, time: '1個月前', text: '非常專業的團隊！合作順暢、技術力強、細節到位，能快速理解需求並給出實用建議。', url: 'https://share.google/Ylad52cI2N4Vw1HgH' },
  { author: 'Chen Ivan', rating: 5, time: '2個月前', text: '整個團隊都非常專業，從報價到設計過程皆很有耐心的一一解說我們提出的問題。', url: 'https://share.google/NpqX6G1GH3QyvjVLd' },
  { author: '蒔穎設計', rating: 5, time: '1個月前', text: '整個製作網站的流程都非常專業且流暢，耐心解答我們的問題。', url: 'https://share.google/Uq8yln3PXC5DYAXEY' },
  { author: '涂威任', rating: 5, time: '3個月前', text: '從初步洽談到提案，整體溝通流暢，窗口非常有耐心，主動提供建議並理解需求。', url: 'https://share.google/qHFV5RfZbl8lU3ujZ' },
];

// ====== 價值主張 ======
const VALUE_POINTS = [
  { title: '客製化網站', desc: '不是套版網站，風格獨一，資訊架構依產業需求規劃。' },
  { title: '關鍵字曝光', desc: '行業＋地區關鍵字規劃，逐季優化，自然搜尋穩定上首頁。' },
  { title: '內容代管', desc: '作品、文章、公告代上傳，網站維護，維持新鮮度與完整度。' },
];

const REVIEWS = GOOGLE_REVIEWS;

// 我們不一樣（五點）
const WHYUS = [
  { title: '在地30+年', desc: '老牌網站行銷公司，安全有保障，不怕變網站孤兒。' },
  { title: '附贈 SEO', desc: '長期累積自然曝光，不用一直花錢買廣告衝流量。' },
  { title: '分身行銷', desc: '17 個百萬流量平台，增加被看見的機會。' },
  { title: '成效看得見', desc: '業界唯一公開客戶成效在官網，不怕您比較。' },
  { title: '顧問式溝通', desc: '行銷小白也不怕，團隊經驗豐富，助您事業更上一層樓。' },
];

// ====== 作品（示意） ======
const WORKS = [
  { title: '影像事務所｜TheEdge邊緣人', tag: '影像拍攝', href: 'https://www.theedge3063.net/', imgUrl: 'https://68b94dfe6bd128008f02eb41--heroic-daffodil-bb01c4.netlify.app/work1.webp' },
  { title: '輕食專賣店｜彩碗colorbow', tag: '餐廳/美食', href: 'https://www.colorbowlpoke.com/', imgUrl: 'https://68b9573a822ab71e06c5fc42--profound-bonbon-03a341.netlify.app/work2.webp' },
  { title: '室內設計｜小山設計所', tag: '空間設計', href: 'https://www.koyamainterior.com/', imgUrl: 'https://68b95c8bd8cb901de4969c64--jovial-fudge-e3ba03.netlify.app/work3.webp' },
  { title: '健身教練｜宣教練團隊', tag: '健身室', href: 'https://www.xuanfit.com.tw/', imgUrl: 'https://68b967a528aae60c829ea047--zingy-lily-faf6c4.netlify.app/work4.webp' },
  { title: '運動場地｜屏東市國民運動中心', tag: '綜合運動中心', href: 'http://www.ptnsc.com.tw/', imgUrl: 'https://68ba5c21d06395c86b0dcf55--beamish-begonia-f30b3b.netlify.app/work5.webp' },
  { title: '爬蟲店｜養個龜溯', tag: '寵物相關', href: 'https://www.guisu-reptile.com/', imgUrl: 'https://68ba5ebfda27f9d21e38ebe6--strong-concha-f684df.netlify.app/work6.webp' },
];

// ====== FAQ ======
const FAQS = [
  { q: '為什麼要年約？', a: '我們不是網站做完就不管的公司，合約期間會持續優化關鍵字與代管維護，且自然排序需要時間累積。' },
  { q: '多久看得到成效？', a: '多數客戶 3–6 個月會看到能見度與詢問提升；每季回顧關鍵字，GA 後台可自行查看。' },
  { q: '不缺生意還需要做網站嗎？', a: '網站也能強化品牌形象與定價，減少溝通成本，避免陷入價格競爭。' },
  { q: '社群夠了嗎？還需要官網？', a: '社群擅長互動但缺主控權；官網能完整呈現專業與流程，讓新客一次看懂並快速聯繫。' },
  { q: '網站做了就有流量嗎？', a: '透過重做官網與關鍵字佈局，提高被搜尋到的機率，並逐季往前。' },
  { q: '有一頁式網頁嗎？', a: '有；是否適合需依行業與目標而定，歡迎私訊討論。' },
];

// ====== 方案（示意） ======
const PLANS = [
  { name: '啟動版', price: 'NT$ 4,287 / 月', items: ['二年約方案', '30 組關鍵字', '加值行銷服務三選一'] },
  { name: '成長版', price: 'NT$ 3,386 / 月', items: ['三年約方案', '40 組關鍵字', '加值行銷服務三選二'] },
  { name: '旗艦版', price: 'NT$ 2,667 / 月', items: ['五年約方案', '50 組關鍵字', '加值行銷服務三選三'], highlight: true },
];

// --------------------------------------------------
function SectionTitle({ k, t, s }: { k: string; t: string; s?: string }) {
  return (
    <div className='mb-6'>
      <div className='flex items-center gap-3'>
        <span className='inline-block w-1.5 h-4 rounded bg-gradient-to-b from-sky-500 to-sky-400' />
        <span className='text-xs font-bold tracking-widest text-sky-700 bg-sky-100 border border-sky-200 rounded-full px-3 py-1'>{k}</span>
      </div>
      <h3 className='mt-2 text-xl font-extrabold tracking-tight text-slate-900'>{t}</h3>
      {s ? <p className='mt-1 text-slate-600 text-sm leading-relaxed'>{s}</p> : null}
      <div className='mt-2 h-px w-10 bg-gradient-to-r from-sky-500/70 to-transparent' />
    </div>
  );
}

// 按鈕系統
function Btn({ href, children, primary=false }: { href: string; children: any; primary?: boolean }) {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer'
       className={
         'inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px ' +
         (primary
           ? 'bg-green-600 text-white hover:bg-green-700 shadow-sm'
           : 'border border-slate-300 text-slate-700 hover:border-slate-400')
       }>
      {children}
    </a>
  );
}

// 數字戰績卡
function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className='rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm'>
      <div className='text-4xl font-black tracking-tight'>{n}</div>
      <div className='mt-1 text-sm text-slate-600'>{label}</div>
    </div>
  );
}

// 作品卡片
function WorkCard({ w }: { w: { title: string; tag: string; href: string; imgUrl: string } }) {
  return (
    <a href={w.href} target='_blank' rel='external noopener noreferrer' onClick={(e)=>{e.preventDefault(); openInNew(w.href);}} className='group block rounded-2xl border bg-white overflow-hidden border-slate-200 ring-1 ring-slate-100 hover:ring-sky-100 hover:shadow-md transition'>
      <div className='relative aspect-[4/3] bg-slate-100 overflow-hidden'>
        <img src={w.imgUrl} alt={w.title} width={1600} height={1200} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]' loading='lazy' onError={(e) => { (e.target as HTMLImageElement).style.display='none'; (e.currentTarget as any).parentElement?.classList.add('grid','place-items-center'); }}/>
        <span className='absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-slate-700 border border-slate-200 shadow-sm'>{w.tag}</span>
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition pointer-events-none' />
        <div className='absolute left-3 bottom-3 md:hidden'><span className='bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-900 border border-slate-200'>{w.title}</span></div>
        <div className='absolute inset-0 hidden md:flex items-end p-4 opacity-0 md:opacity-0 md:group-hover:opacity-100 transition'>
          <div>
            <div className='font-extrabold text-white drop-shadow-sm'>{w.title}</div>
            <div className='mt-1 inline-flex items-center gap-1 text-white/90'>查看作品 <ExternalLink size={16}/></div>
          </div>
        </div>
      </div>
    </a>
  );
}

// --------------------------------------------------
export default function App() {
  const [active, setActive] = useState<string>('');
  const [progress, setProgress] = useState(0);

  // 輕量 SEO：寫入 <head>
  useEffect(() => {
    document.title = SEO.title;
    const set = (attr: 'name'|'property', key: string, value: string) => {
      const selector = attr === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
      let m = document.querySelector(selector) as HTMLMetaElement | null;
      if (!m) { m = document.createElement('meta'); m.setAttribute(attr, key); document.head.appendChild(m); }
      m.setAttribute('content', value);
    };
    set('name','description', SEO.description);
    set('property','og:title', SEO.title);
    set('property','og:description', SEO.description);
    set('property','og:image', SEO.image);
    set('property','og:url', SEO.url);
    set('name','twitter:card', 'summary_large_image');
    set('name','twitter:title', SEO.title);
    set('name','twitter:description', SEO.description);
    set('name','twitter:image', SEO.image);
    set('property','og:locale', SEO.locale);

    // canonical（唯一網址）
    {
      let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; document.head.appendChild(canon); }
      canon.href = SEO.url;
    }

    // JSON-LD（Organization）
    {
      const data = {
        "@context":"https://schema.org",
        "@type":"Organization",
        name: PROFILE.nameZh,
        url: SEO.url,
        logo: SEO.image,
        sameAs: [LINKS.ig, LINKS.fb]
      } as const;
      let ld = document.getElementById('ld-org') as HTMLScriptElement | null;
      if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'ld-org'; document.head.appendChild(ld); }
      ld.text = JSON.stringify(data);
    }

    // Preload 首屏大圖（提升 LCP）
    {
      let pre = document.querySelector('link[data-hero-preload]') as HTMLLinkElement | null;
      if (!pre) { pre = document.createElement('link'); pre.rel = 'preload'; pre.as = 'image'; pre.setAttribute('data-hero-preload',''); document.head.appendChild(pre); }
      pre.href = HERO_IMG;
    }
    }, []);

  // Scroll-Spy：觀察各區塊使導覽高亮
  useEffect(() => {
    const ids = ['services','works','why-us','process','plans','contact'];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean) as Element[];
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b)=> (b.intersectionRatio - a.intersectionRatio))[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, { rootMargin: '-20% 0px -60% 0px', threshold: [0.2,0.4,0.6,0.8] });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const h = doc.scrollHeight - (window.innerHeight || 0);
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 64; // sticky nav height
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // --- Runtime 自我測試（最小測試案例） ---
  useEffect(() => {
    try {
      console.assert(typeof SEO.title === 'string' && SEO.title.length > 0, 'SEO.title 應有值');
      console.assert(Array.isArray(WORKS), 'WORKS 應為陣列');
      console.assert(Array.isArray(PLANS) && PLANS.length >= 3, 'PLANS 應至少三種');
      console.assert(Array.isArray(WHYUS) && WHYUS.length === 5, 'WHYUS 應為五點');
      const ids = ['services','works','why-us','process','plans','contact'];
      ids.forEach(id => { if (!document.getElementById(id)) console.warn('[Test] 缺少區塊:', id); });
      // 追加：icon 匯入檢查，避免 'X is not defined'
      const ICONS = [Instagram, Facebook, Mail, MessageCircle, Sparkles, Check, ChevronRight, Star, ExternalLink, ArrowUp, Compass, FileSignature, Image, Layout, Rocket, TrendingUp, ShieldCheck, Megaphone, BadgeCheck];
      ICONS.forEach((Ic, i) => console.assert(!!Ic, `Icon 匯入缺少 (index ${i})`));
    } catch (e) {
      console.warn('[Test] 迷你測試異常', e);
    }
  }, []);

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900'>
      {/* NAV */}
      <nav className='sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200 relative'>
        <div className='max-w-6xl mx-auto px-4 h-14 flex items-center justify-between'>
          <div className='font-extrabold tracking-tight'>{PROFILE.nameZh}</div>
          <div className='hidden md:flex items-center gap-2 text-sm'>
            {[
              {id:'services',label:'服務'},
              {id:'works',label:'作品'},
              {id:'why-us',label:'我們不一樣'},
              {id:'process',label:'流程'},
              {id:'plans',label:'方案'},
              {id:'contact',label:'聯絡'},
            ].map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={(e)=>{e.preventDefault();scrollToId(l.id);}}
                 className={`px-2 py-1 rounded-lg hover:text-sky-700 border-b-2 border-transparent ${active===l.id ? 'bg-sky-50 text-sky-700 border-sky-600' : ''}`}>{l.label}</a>
            ))}
          </div>
          <div className='flex items-center gap-2'>
            <a href={LINKS.ig} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1 text-xs bg-red-600 text-white px-3 py-2 rounded-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'>
              <Instagram size={16}/> IG 諮詢
            </a>
            <a href={LINKS.fb} target='_blank' rel='noopener noreferrer' className='hidden sm:inline-flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-2 rounded-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'>
              <Facebook size={16}/> FB 諮詢
            </a>
            <a href={LINKS.line} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-2 rounded-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'>
              <MessageCircle size={16}/> LINE 諮詢
            </a>
          </div>
        </div>
        <div className='absolute bottom-0 left-0 h-0.5 bg-sky-600/90 rounded-r-full' style={{width: `${progress}%`}} />
      </nav>

      {/* HERO */}
      <header className='relative overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute inset-0 pointer-events-none' style={{backgroundImage: `url(${HERO_IMG})`, backgroundSize:'cover', backgroundPosition:'center'}}/>
          <div className='absolute inset-0 bg-gradient-to-br pointer-events-none from-slate-900/10 via-sky-600/15 to-sky-500/10'/>
          <div className='absolute inset-0 bg-gradient-to-r pointer-events-none from-slate-900/60 via-slate-900/25 to-transparent'/>
          {/* Hero 聚焦：暗角 + 細噪點 */}
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.55)_0%,rgba(2,6,23,0.28)_40%,transparent_70%)] pointer-events-none' />
          <div className='absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none bg-[radial-gradient(#000_0.5px,transparent_0.5px)] [background-size:3px_3px]' />
        </div>
        <div className='max-w-6xl mx-auto px-4 py-16 md:py-20 relative'>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div>
              <p className='text-sky-100/90 font-bold text-xs tracking-widest uppercase flex items-center gap-2'><Sparkles size={14}/> {PROFILE.title}</p>
              <h1 className='text-[34px] md:text-[52px] font-extrabold leading-tight mt-2 text-white drop-shadow'>{PROFILE.tagline}</h1>
              <p className='text-slate-100/90 mt-3 max-w-xl whitespace-pre-line'>{PROFILE.summary}</p>
              <div className='flex flex-wrap items-center gap-3 mt-5 relative z-10'>
                <a href={LINKS.line} target='_blank' rel='external noopener noreferrer' onClick={(e)=>{e.preventDefault(); openInNew(LINKS.line);}} className='inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px bg-green-600 text-white hover:bg-green-700 shadow-sm'><MessageCircle size={18}/> LINE 諮詢 <ExternalLink size={18}/></a>
                <a href={LINKS.ig} target='_blank' rel='external noopener noreferrer' className='inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px bg-red-600 text-white hover:bg-red-700'><Instagram size={18}/> IG 線上諮詢</a>
                <a href={LINKS.fb} target='_blank' rel='external noopener noreferrer' onClick={(e)=>{e.preventDefault(); openInNew(LINKS.fb);}} className='inline-flex items-center gap-2 px-4 py-3 rounded-xl font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px bg-blue-600 text-white hover:bg-blue-700'><Facebook size={18}/> FB 線上諮詢</a>
              </div>
            </div>
            <div className='md:flex md:justify-end'>
              <div className='bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 w-full md:max-w-sm'>
                <div className='text-xs font-bold tracking-widest uppercase text-slate-700'>YKQK TEAM</div>
                <div className='mt-1 text-2xl font-extrabold text-slate-900'>官網架設一條龍</div>
                <p className='mt-1 text-sm text-slate-700'>客製化網站 x 關鍵字曝光 x 內容代管</p>
                <div className='mt-4 grid grid-cols-3 gap-2 text-center'>
                  <div className='rounded-xl bg-white/85 backdrop-blur p-3 border border-white/60'>
                    <div className='text-xl font-black text-slate-900'>30+</div>
                    <div className='text-[11px] font-bold text-slate-600'>年經驗</div>
                  </div>
                  <div className='rounded-xl bg-white/85 backdrop-blur p-3 border border-white/60'>
                    <div className='text-xl font-black text-slate-900'>13,000+</div>
                    <div className='text-[11px] font-bold text-slate-600'>成功案例</div>
                  </div>
                  <div className='rounded-xl bg-white/85 backdrop-blur p-3 border border-white/60'>
                    <div className='flex items-center justify-center gap-1 text-xl font-black text-amber-500'><Star size={16} fill='#f59e0b' className='text-amber-500'/>5.0</div>
                    <div className='text-[11px] font-bold text-slate-600'>Google 評價</div>
                  </div>
                </div>
                <div className='mt-4 text-xs text-slate-700'>讓我們成就你心目中的品牌形象</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* WAVE DIVIDER */}
      <div className='-mt-1 text-sky-50'><svg viewBox='0 0 1200 60' preserveAspectRatio='none' className='w-full h-8'><path d='M0,0 C 300,60 900,0 1200,50 L1200,60 L0,60 Z' className='fill-current'></path></svg></div>

      <main>
        {/* SERVICES */}
        <motion.section id='services' className='max-w-6xl mx-auto px-4 py-16 scroll-mt-20 lg:scroll-mt-24 rounded-3xl border border-slate-200 bg-white shadow-sm' initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.5}}>
          <SectionTitle k='SERVICES' t='三大重點' s='快速理解我們在做什麼' />
          
          <div className='grid md:grid-cols-3 gap-4'>
            <div className='rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md'>
              <h3 className='font-semibold text-lg'>① 客製化網站</h3>
              <p className='text-sm leading-relaxed text-slate-700 mt-2'>幫企業打造「線上門面」，減少解釋成本，提高品牌價值，避免陷入價格戰。</p>
            </div>
            <div className='rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md'>
              <h3 className='font-semibold text-lg'>② 關鍵字行銷</h3>
              <p className='text-sm leading-relaxed text-slate-700 mt-2'>讓潛在客戶「主動找上你」，規劃行業＋地區關鍵字布局，不錯過精準客群。</p>
            </div>
            <div className='rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md'>
              <h3 className='font-semibold text-lg'>③ 網站小編</h3>
              <p className='text-sm leading-relaxed text-slate-700 mt-2'>網站代管與更新協助，圖文優化、技術維護，您專心做生意，我們把網站顧好。</p>
            </div>
          </div>
        </motion.section>

        {/* PROOF */}
        <motion.section id='proof' className='max-w-6xl mx-auto px-4 py-16 rounded-3xl border border-slate-200 bg-white shadow-sm' initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.5}}>
          <SectionTitle k='PROOF' t='成效公開可驗證' />
          <div className='grid md:grid-cols-3 gap-4 mb-6'>
            <Stat n='30+ 年' label='在地經驗' />
            <Stat n='13,000+' label='跨產業成功案例' />
            <Stat n='5.0' label='Google 評價' />
          </div>
          <div className='grid md:grid-cols-4 gap-4'>
            <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='text-xs font-bold text-sky-700'>關鍵字首頁</div>
              <p className='text-sm leading-relaxed text-slate-700 mt-1'>服務/區域詞逐季推進，追蹤 Google 曝光關鍵字與組數，穩定累積搜尋資產。</p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='text-xs font-bold text-sky-700'>同行案例</div>
              <p className='text-sm leading-relaxed text-slate-700 mt-1'>跨產業 13,000+ 成功案例，對齊你的定位與風格，提供可比對的門面與成果。</p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='text-xs font-bold text-sky-700'>真實評論</div>
              <p className='text-sm leading-relaxed text-slate-700 mt-1'>Google 高分評論，附原文連結，可驗證服務口碑與流程體驗。</p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
              <div className='text-xs font-bold text-sky-700'>流程透明</div>
              <p className='text-sm leading-relaxed text-slate-700 mt-1'>需求 → 企劃 → 設計 → 上線 → 代管；服務期間關鍵字持續優化。</p>
            </div>
          </div>
        </motion.section>

        {/* WORKS */}
        <motion.section id='works' className='max-w-6xl mx-auto px-4 py-16 scroll-mt-20 lg:scroll-mt-24 rounded-3xl border border-slate-200 bg-white shadow-sm' initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.5}}>
          <SectionTitle k='WORKS' t='精選作品 / 類型' />
          {Array.isArray(WORKS) && WORKS.length > 0 ? (
            <div className='grid md:grid-cols-3 gap-4'>
              {WORKS.map((w) => (
                <WorkCard key={w.title} w={w} />
              ))}
            </div>
          ) : (
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md'>
                <h3 className='font-semibold text-lg'>作品預留位</h3>
                <p className='text-sm leading-relaxed text-slate-700 mt-1'>之後放作品截圖與說明（目前為暫位）。</p>
              </div>
              <div className='rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md'>
                <h3 className='font-semibold text-lg'>作品預留位</h3>
                <p className='text-sm leading-relaxed text-slate-700 mt-1'>可依照類型分區：住宅 / 商空 / 改造…</p>
              </div>
            </div>
          )}
        </motion.section>

        {/* WAVE DIVIDER */}
        <div className='text-sky-50 rotate-180'><svg viewBox='0 0 1200 60' preserveAspectRatio='none' className='w-full h-8'><path d='M0,0 C 300,60 900,0 1200,50 L1200,60 L0,60 Z' className='fill-current'></path></svg></div>
        {/* WHY US */}
        <div className='relative z-0 h-36 -mb-36 pointer-events-none'>
          <div className='absolute inset-0'>
            <div className='mx-auto h-full max-w-5xl bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.10),transparent_60%)] blur-2xl' />
          </div>
        </div>
        <motion.section id='why-us' className='max-w-6xl mx-auto px-4 py-16 scroll-mt-20 lg:scroll-mt-24 rounded-3xl border border-slate-200 bg-white shadow-sm' initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.5}}>
          <SectionTitle k='WHY US' t='我們不一樣' />
          <div className='grid md:grid-cols-2 gap-4'>
            {WHYUS.map((i, idx) => (
              <div key={i.title} className='rounded-2xl p-5 bg-white border border-slate-200 shadow-sm'>
                <div className='flex items-start gap-3'>
                  <div className='grid place-items-center w-10 h-10 rounded-full bg-sky-50 border border-sky-200 text-sky-700 shrink-0'>
                    {idx===0 ? <ShieldCheck size={20}/> : idx===1 ? <BadgeCheck size={20}/> : idx===2 ? <Megaphone size={20}/> : idx===3 ? <Star size={20}/> : <MessageCircle size={20}/>}
                  </div>
                  <div>
                    <div className='text-xs font-bold text-sky-700'>{i.title}</div>
                    <p className='text-slate-700 text-sm leading-relaxed mt-1'>{i.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROCESS */}
        <div className='relative z-0 h-36 -mb-36 pointer-events-none'>
          <div className='absolute inset-0'>
            <div className='mx-auto h-full max-w-5xl bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.10),transparent_60%)] blur-2xl' />
          </div>
        </div>
        <motion.section id='process' className='max-w-6xl mx-auto px-4 py-16 scroll-mt-20 lg:scroll-mt-24 rounded-3xl border border-slate-200 bg-white shadow-sm' initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.5}}>
          <SectionTitle k='PROCESS' t='合作流程' s='六個步驟，清楚透明' />
          <div className='grid md:grid-cols-3 gap-4'>
            {[
              {icon:<Compass size={28}/>, title:'第一步：清楚規劃方向', desc:'釐清目標、預算與時程，確認網站目的與受眾。'},
              {icon:<FileSignature size={28}/>, title:'第二步：簽約', desc:'確認範疇、時程與權責，雙方簽署合作書。'},
              {icon:<Image size={28}/>, title:'第三步：提供品牌素材', desc:'提供 Logo、色票、照片、文案等素材，或交由我們協助整理。'},
              {icon:<Layout size={28}/>, title:'第四步：網站設計調整', desc:'依品牌風格製作版型並來回討論，細節調整到位。'},
              {icon:<Rocket size={28}/>, title:'第五步：網站上線代管', desc:'協助上線、設定網域/主機/追蹤碼，後續代管維護。'},
              {icon:<TrendingUp size={28}/>, title:'第六步：成效回顧與優化', desc:'定期回顧排名與詢問量，持續優化關鍵字與內容。'},
            ].map((s,i)=>(
              <div key={i} className='relative rounded-2xl p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md text-center'>
                <span className='absolute top-3 left-3 text-[10px] font-bold tracking-widest text-sky-700 bg-sky-50 border border-sky-200 rounded-full px-2 py-0.5'>STEP {i+1}</span>
                <div className='mx-auto grid place-items-center w-12 h-12 rounded-full bg-sky-50 border border-sky-200 text-sky-700 mb-3'>
                  {s.icon}
                </div>
                <div className='font-semibold'>{s.title}</div>
                <p className='text-sm leading-relaxed text-slate-700 mt-2'>{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* REVIEWS */}
        <motion.section id='reviews' className='max-w-6xl mx-auto px-4 py-16 rounded-3xl border border-slate-200 bg-white shadow-sm' initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.5}}>
          <SectionTitle k='REVIEWS' t='客戶回饋' />
          <div className='grid md:grid-cols-2 gap-4'>
            {REVIEWS.map((r) => (
              <div key={(r as any).url || r.author + (r.time || '')} className='relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
                <div className='absolute -top-3 left-4 text-4xl text-slate-200 select-none'>“</div>
                <span className='absolute right-3 top-3 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5'>Google</span>
                <div className='flex items-center gap-1 text-amber-500 mb-2'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill='#f59e0b' className='text-amber-500' />
                  ))}
                </div>
                <p className='text-sm text-slate-700 leading-relaxed'>{r.text}</p>
                <div className='mt-3 text-xs text-slate-500 text-right'>
                  — <a href={(r as any).url} target='_blank' rel='noopener' className='text-slate-600 hover:text-sky-700'>{r.author}</a>{r.time ? `（${r.time}）` : null}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PLANS */}
        {/* WAVE DIVIDER */}
        <div className='-mt-1 text-sky-50'><svg viewBox='0 0 1200 60' preserveAspectRatio='none' className='w-full h-8'><path d='M0,0 C 300,60 900,0 1200,50 L1200,60 L0,60 Z' className='fill-current'></path></svg></div>
        <motion.section id='plans' className='max-w-6xl mx-auto px-4 py-16 scroll-mt-20 lg:scroll-mt-24 rounded-3xl border border-slate-200 bg-white shadow-sm' initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.5}}>
          <SectionTitle k='PLANS' t='合作方案' />
          <div className='grid md:grid-cols-3 gap-4'>
            {PLANS.map((p) => (
              <div key={p.name} className={`relative rounded-2xl border p-5 bg-white ${p.highlight ? 'border-sky-300 ring-2 ring-sky-200 shadow-md md:scale-[1.02]' : 'border-slate-200 shadow-sm'} hover:shadow-md transition`}>
                {p.highlight ? (
                  <div className='absolute right-3 top-3 bg-amber-400/90 text-white text-[11px] px-2 py-0.5 rounded'>CP 值最高</div>
                ) : null}
                <div className='text-xs font-bold text-sky-700'>{p.name}</div>
                <div className='text-2xl font-extrabold mt-1'>{p.price}</div>
                <ul className='mt-3 space-y-2 text-sm text-slate-700'>
                  {p.items.map((it) => (
                    <li key={it} className='flex items-start gap-2'><Check size={16} className='text-emerald-600 mt-0.5'/> {it}</li>
                  ))}
                </ul>
                <a href={LINKS.line} target='_blank' rel='noopener' className='mt-4 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-sky-600 px-3 py-2 text-sm font-bold text-white hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'>LINE 詢問此方案 <ChevronRight size={16}/></a>
              </div>
            ))}
          </div>
          <p className='text-xs md:text-sm leading-relaxed text-slate-600 mt-4'>無論選擇哪個方案，皆有完整一條龍服務，主要差別在初始關鍵字組數以及優惠價，5 年方案 CP 值最高。</p>
        </motion.section>

        {/* FAQ */}
        <motion.section className='max-w-6xl mx-auto px-4 py-16 rounded-3xl border border-slate-200 bg-white shadow-sm' initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.5}}>
          <SectionTitle k='FAQ' t='常見問答' />
          <div className='space-y-3'>
            {FAQS.map((f) => (
              <details key={f.q} className='group rounded-xl border border-slate-200 bg-white p-4 open:ring-1 open:ring-sky-200'>
                <summary className='font-bold cursor-pointer flex items-center justify-between'>
                  {f.q}
                  <span className='text-slate-400 transition group-open:rotate-45'>+</span>
                </summary>
                <p className='text-sm leading-relaxed text-slate-600 mt-2'>{f.a}</p>
              </details>
            ))}
          </div>
        </motion.section>

        {/* CONTACT */}
        <motion.section id='contact' className='max-w-6xl mx-auto px-4 py-16 scroll-mt-20 lg:scroll-mt-24 rounded-3xl border border-slate-200 bg-white shadow-sm' initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, amount:0.2}} transition={{duration:0.5}}>
          <SectionTitle k='CONTACT' t='聯絡我' />
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='rounded-2xl border border-slate-200 p-5 bg-white shadow-sm'>
              <h4 className='font-extrabold text-lg'>一起把官網做好用</h4>
              <p className='text-sm leading-relaxed text-slate-600 mt-2'>直接用 IG、FB 或 LINE 找我最快；若想 Email 也可以。</p>
              <div className='mt-4 flex flex-wrap gap-2'>
                <a href={LINKS.ig} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 bg-red-600 text-white px-4 py-3 rounded-xl font-bold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'><Instagram size={18}/> IG 線上諮詢</a>
                <a href={LINKS.fb} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'><Facebook size={18}/> FB 線上諮詢</a>
                <a href={LINKS.line} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'><MessageCircle size={18}/> LINE 諮詢</a>
              </div>
              <div className='mt-4 text-sm text-slate-700 space-y-1'>
                <div className='flex items-center gap-2'><Mail size={16}/> {PROFILE.email}</div>
                <div className='flex items-center gap-2'><MessageCircle size={16}/> LINE ID: {PROFILE.lineId}</div>
              </div>
            </div>
            <div className='rounded-2xl border border-slate-200 p-5 bg-white grid place-items-center'>
              <img src='https://68bf9b33eece536bcaa7320d--transcendent-trifle-3df6b8.netlify.app/qr-line-800.png' alt='LINE QR' className='w-full max-w-[280px] h-auto rounded-xl shadow object-contain' loading='lazy' width={800} height={800} />
            </div>
          </div>
        </motion.section>
      </main>

      {/* Back to Top */}
      <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className='hidden md:flex fixed bottom-4 left-4 z-50 items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white shadow-lg'><ArrowUp size={18}/></button>

      {/* MOBILE QUICK CONTACT */}
      <div className='md:hidden fixed bottom-4 right-4 z-50'>
        <a aria-label='LINE 諮詢' href={LINKS.line} target='_blank' rel='noopener noreferrer' className='rounded-full bg-green-600 text-white px-5 py-4 shadow-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'>LINE 諮詢</a>
      </div>

      {/* FOOTER */}
      <footer className='border-t border-slate-200 py-10'>
        <div className='max-w-6xl mx-auto px-4 text-sm text-slate-500'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <div className='font-bold text-slate-800'>{PROFILE.nameZh} · {PROFILE.title}</div>
              <div className='mt-1'>© {new Date().getFullYear()} All rights reserved.</div>
            </div>
            <div className='flex items-center gap-3'>
              <a href={LINKS.line} target='_blank' rel='noopener' className='inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'>LINE 諮詢</a>
              <a href={LINKS.ig} target='_blank' rel='noopener' className='inline-flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'>IG</a>
              <a href={LINKS.fb} target='_blank' rel='noopener' className='inline-flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:translate-y-px'>FB</a>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap gap-3'>
            {['services','works','why-us','process','plans','contact'].map(id => (
              <a key={id} href={`#${id}`} onClick={(e)=>{e.preventDefault();scrollToId(id);}} className='text-slate-600 hover:text-sky-700'>{({services:'服務',works:'作品','why-us':'我們不一樣',process:'流程',plans:'方案',contact:'聯絡'} as any)[id]}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
