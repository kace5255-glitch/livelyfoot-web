import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, Sparkles, UserCheck, ShieldCheck, HeartPulse, ChevronRight, Phone, CalendarCheck, ChevronDown, ChevronUp } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function FAQItem({ faq, initialOpen = false }: { faq: any, initialOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} transition={{delay: 0.1}} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-spa-sand/20">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none">
        <span className="font-serif text-spa-ink text-lg">{faq.q}</span>
        <span className="bg-spa-bg rounded-full p-2 text-spa-ink/60 transition-transform duration-300">
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-5 text-spa-ink/70 text-sm leading-relaxed">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SpaLanding() {
  return (
    <div className="min-h-screen relative font-sans text-spa-ink bg-spa-bg overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 glass-panel border-b border-white/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo image. Please upload your logo image as logo.png to the public folder! */}
            <div className="relative h-10 w-auto flex items-center">
              <img 
                src="/logo.png" 
                alt="Lively Foot Logo" 
                className="h-full w-auto object-contain fallback-hidden" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                }}
              />
              <Sparkles className="fallback-icon hidden text-spa-gold w-6 h-6" />
            </div>
            <span className="font-serif text-2xl font-medium tracking-wider flex items-baseline gap-2">
              Lively Foot 
              <span className="font-sans text-lg text-spa-olive">活力足</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest text-spa-ink/80 uppercase">
            <a href="#about" className="hover:text-spa-gold transition-colors">關於我們</a>
            <a href="#services" className="hover:text-spa-gold transition-colors">專業療程</a>
            <a href="#pricing" className="hover:text-spa-gold transition-colors">現金套票</a>
          </div>
          <button className="bg-spa-ink text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-spa-gold transition-colors flex items-center gap-2">
            <CalendarCheck className="w-4 h-4" />
            <span>立即預約</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
             src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
             alt="Spa Environment" 
             className="w-full h-full object-cover opacity-[0.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-spa-bg/40 via-spa-bg/80 to-spa-bg"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden" animate="visible" variants={stagger}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-spa-gold/30 bg-spa-gold/10 w-fit text-spa-gold text-xs font-semibold tracking-widest uppercase">
               <MapPin className="w-3 h-3" /> 香港跑馬地
            </motion.div>
            <motion.h1 variants={fadeIn} className="font-serif text-5xl md:text-7xl font-light leading-[1.15] text-balance">
              由內而外<br />喚醒健康體魄
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-spa-ink/70 max-w-md font-light leading-relaxed">
              超過十年的專業按摩與護理經驗。在繁囂的都市中，為您提供一處放鬆身心的靜謐綠洲。
            </motion.p>
            <motion.div variants={fadeIn} className="flex gap-4 pt-4">
               <button className="bg-spa-gold text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wider hover:bg-spa-olive transition-colors shadow-lg shadow-spa-gold/20 flex items-center gap-2">
                 聯絡我們預約 <ChevronRight className="w-4 h-4" />
               </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Foot Massage" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl glass-panel">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-spa-bg flex items-center justify-center text-spa-gold">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold">深夜營業</div>
                  <div className="text-xs text-spa-ink/60">每日營業至凌晨 12 點</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features / Advantages */}
      <section id="about" className="py-32 relative overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1544161515-4ab2ce82eb28?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="About Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#6B5A39]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
               <div className="w-8 h-[1px] bg-spa-gold"></div>
               <span className="text-spa-gold uppercase tracking-widest text-sm">WHY CHOOSE US</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl mb-4 font-bold tracking-wide">我們的優勢</h2>
            <p className="font-serif italic text-white/80">The features we offer to you.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {[
              { icon: Clock, title: "十年經驗", desc: "深耕跑馬地超過十年" },
              { icon: UserCheck, title: "專業團隊", desc: "資深師傅主理" },
              { icon: ({className}:any) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>, title: "深夜營業", desc: "每日營業至凌晨12點" },
              { icon: ({className}:any) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>, title: "舒適環境", desc: "乾淨安心的空間" }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeIn} className="text-center group">
                <div className="w-24 h-24 mx-auto rounded-full border border-spa-gold/50 flex items-center justify-center mb-6 text-spa-gold group-hover:bg-spa-gold group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-8 h-8 font-light" />
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-sm opacity-80 font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="max-w-2xl">
              <h2 className="font-serif text-3xl md:text-4xl mb-4">專業療程詳解</h2>
              <p className="text-spa-ink/70">無論您需要舒緩雙足的疲勞，或是全身深層放鬆，我們提供全方位的專業護理，針對您的需求量身定制。</p>
            </motion.div>
            <motion.button initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-spa-olive font-semibold flex items-center gap-2 hover:text-spa-gold transition-colors text-sm uppercase tracking-widest whitespace-nowrap">
              查看全部療程 <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: '01', title: '足底反射按摩', desc: '透過刺激雙腳的反射區，調節全身對應器官的機能。能有效改善血液循環，緩解雙腿沉重感及改善睡眠質量，是繁忙都市人的放鬆首選。', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { id: '02', title: '全身穴位推拿', desc: '針對長期坐姿不正導致的肩頸腰背痠痛。技師運用指壓、揉捏手法精確定位穴位，深層鬆解緊繃肌肉，疏通經絡，恢復身體活動度。', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { id: '03', title: '淋巴排毒按摩', desc: '採用輕柔且節律性的手法，引導淋巴液流動，加速代謝體內多餘的水分與廢物。有助於減輕身體浮腫，提升免疫系統效能，改善體質。', img: 'https://images.unsplash.com/photo-1620603759368-2eb42ebde368?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { id: '04', title: '舒壓孕婦按摩', desc: '專為準媽媽設計的溫和按摩。減輕懷孕期間常見的下肢浮腫、腰椎壓力及肌肉抽筋，技師會配合安全的體位，幫助準媽媽放鬆身心。', img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { id: '05', title: '上海式修甲', desc: '傳承正宗上海修甲工藝，使用專業工具細緻處理厚繭、死皮及灰甲等問題。不僅是美容，更是對足部健康的一種深度清理與維護。', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
              { id: '06', title: '特色刮痧療程', desc: '透過刺激體表經絡，排除體內蓄積的邪氣與熱毒。能有效緩解初起感冒、肩頸僵硬及中暑症狀，提升身體抗病能力。', img: 'https://images.unsplash.com/photo-1544161513-01f11a76bbfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] mb-6">
                   <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex gap-4">
                  <div className="text-spa-gold font-serif text-2xl font-light">{service.id}</div>
                  <div>
                    <h3 className="text-xl font-serif mb-2 group-hover:text-spa-gold transition-colors">{service.title}</h3>
                    <p className="text-sm text-spa-ink/70 leading-relaxed font-light">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages / Pricing section */}
      <section id="pricing" className="py-24 bg-spa-bg relative border-t border-spa-sand/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
             <span className="text-spa-gold uppercase tracking-widest text-xs font-bold mb-4 block">Pricing</span>
             <h2 className="font-serif text-3xl md:text-4xl text-spa-ink mb-6">服務價目表</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-8">
              {/* 主要服務項目 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white rounded-[2rem] p-8 shadow-sm border border-spa-sand/20">
                <h3 className="text-lg font-serif mb-6 text-spa-ink font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-spa-gold" /> 主要服務項目
                </h3>
                <div className="space-y-6">
                  {[
                    { name: '足底按摩', time: '50 / 75 / 100 Min', price: '$218 / $327 / $436' },
                    { name: '全身按摩', time: '50 / 75 / 100 Min', price: '$270 / $405 / $540' },
                    { name: '精油全身按摩', time: '50 / 75 / 100 Min', price: '$270 / $405 / $540' },
                    { name: '全身淋巴按摩', time: '50 / 75 / 100 Min', price: '$340 / $510 / $680' },
                    { name: '孕婦按摩', time: '50 / 75 / 100 Min', price: '$380 / $570 / $760' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-spa-sand/20 pb-4 last:border-0 last:pb-0">
                      <div>
                        <div className="text-spa-ink font-medium mb-1">{item.name}</div>
                        <div className="text-spa-ink/60 text-xs">{item.time}</div>
                      </div>
                      <div className="text-spa-ink font-medium">{item.price}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 其他專業護理 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white rounded-[2rem] p-8 shadow-sm border border-spa-sand/20">
                <h3 className="text-lg font-serif mb-6 text-spa-ink font-semibold">其他專業護理</h3>
                <div className="space-y-6">
                  {[
                    { name: '頭肩頸 / 手部', price: '$135(25m) / $270(50m)' },
                    { name: '痛症舒緩 (30m)', price: '$488' },
                    { name: '修甲 / 刮痧', price: '$218' },
                    { name: '嫁接睫毛', price: '$488' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-spa-sand/20 pb-4 last:border-0 last:pb-0">
                      <div className="text-spa-ink font-medium">{item.name}</div>
                      <div className="text-spa-ink font-medium">{item.price}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="space-y-8">
              {/* 精選組合 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-white rounded-[2rem] p-8 shadow-sm border border-spa-sand/20">
                <h3 className="text-lg font-serif mb-1 text-spa-ink font-semibold">精選組合</h3>
                <p className="text-xs text-spa-ink/60 mb-6">Combos</p>
                <div className="space-y-6">
                  {[
                    { name: '足底(50m) + 頭肩頸(25m)', price: '$353' },
                    { name: '足底(50m) + 手部(25m)', price: '$353' },
                    { name: '足底(25m) + 全身(25m)', price: '$244' },
                    { name: '足底(50m) + 全身(50m)', price: '$488' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-spa-sand/20 pb-4 last:border-0 last:pb-0">
                      <div className="text-spa-ink font-medium">{item.name}</div>
                      <div className="text-spa-ink font-medium">{item.price}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 現金套票優惠 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="bg-spa-olive/10 border border-spa-olive/20 rounded-[2rem] p-8">
                <h3 className="text-lg font-serif mb-6 text-spa-ink font-semibold flex items-center gap-2">
                  <span className="bg-spa-olive text-white p-1 rounded-md"><CalendarCheck className="w-4 h-4" /></span>
                  現金套票優惠
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-6 text-center border border-spa-sand/30 shadow-sm relative overflow-hidden">
                    <div className="text-2xl font-light text-spa-ink mb-2">$3,000</div>
                    <div className="bg-spa-gold/90 text-white text-xs py-1 px-3 rounded-full inline-block">額外贈送 $300</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center border border-spa-sand/30 shadow-sm relative overflow-hidden">
                    <div className="text-2xl font-light text-spa-ink mb-2">$5,000</div>
                    <div className="bg-spa-gold/90 text-white text-xs py-1 px-3 rounded-full inline-block">額外贈送 $600</div>
                  </div>
                </div>
                <p className="text-xs text-center text-spa-ink/60">現金券不設找贖，有效期為購買日起 18 個月</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-spa-bg relative border-t border-spa-sand/30">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
             <span className="text-spa-gold uppercase tracking-widest text-xs font-bold mb-4 block">FAQ</span>
             <h2 className="font-serif text-3xl md:text-4xl text-spa-ink mb-2">常見問題</h2>
             <p className="text-spa-ink/60">解答您對按摩服務的疑問</p>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: '需要提前預約嗎？', a: '建議透過 WhatsApp 或電話預約，以確保技能為您安排合適時段。Walk-in 客人視當日情況而定。' },
              { q: '按摩療程需時多久？', a: '一般服務項目時間為 25 至 100 分鐘不等，視乎您選擇的療程。' },
              { q: '孕婦可以做按摩嗎？', a: '我們提供專為孕婦設計的溫和按摩服務，詳情可預約時查詢。' },
              { q: '現金套票可以轉讓嗎？', a: '現金套票可與親友共享。' },
              { q: '你們的營業時間是？', a: '每日 10:00 AM 至 12:00 MN。' },
              { q: '如何前往你們的位置？', a: '位於跑馬地景光街，鄰近多條巴士及小巴線。' }
            ].map((faq, i) => {
              return <FAQItem key={i} faq={faq} initialOpen={i === 0} />;
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-spa-ink text-white">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1544161515-4ab2ce82eb28?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="CTA Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-spa-ink via-transparent to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">我們期待為您提供最專業的按摩護理服務</h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            空間環境乾淨、舒適，給您最安心的體驗。如果您正在尋找真正能解決身體疲勞的專業按摩，Lively Foot - 活力足 是您的第一選擇。歡迎來電預約。
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="https://wa.me/85228032880" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20BE5C] text-white rounded-full font-bold tracking-wider transition-colors shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.573-10.564 5.832 0 10.572 4.74 10.573 10.564 0 5.824-4.74 10.563-10.573 10.563z"/></svg> 
              WhatsApp
            </a>
            <a href="tel:28032880" className="w-full sm:w-auto px-8 py-4 bg-[#B38E5D] hover:bg-[#a17d4f] text-white rounded-full font-bold tracking-wider transition-colors shadow-lg shadow-[#B38E5D]/20 flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" /> 2803 2880
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#6B5A39] text-spa-bg/80 text-sm relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          
          <div>
            <h4 className="text-[#B38E5D] font-serif mb-6 text-xl tracking-wide font-medium">Lively Foot - 活力足</h4>
            <ul className="space-y-2">
              <li>跑馬地景光街5號景祥大廈M樓</li>
              <li>2803 2880</li>
              <li>2803 2801</li>
            </ul>
          </div>

          <div>
             <ul className="space-y-4">
                 <li><a href="#" className="hover:text-white transition-colors">首頁</a></li>
                 <li><a href="#pricing" className="hover:text-white transition-colors">服務價目</a></li>
                 <li><a href="#services" className="hover:text-white transition-colors">專業療程</a></li>
                 <li><a href="#about" className="hover:text-white transition-colors">聯絡我們</a></li>
             </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-[#B38E5D] font-serif mb-6 text-lg">營業時間</h4>
            <p className="mb-6">每日 10:00 AM - 12:00 MN</p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-spa-bg/20 flex items-center justify-center hover:bg-spa-bg/10 hover:text-white transition-colors">
                 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-spa-bg/20 flex items-center justify-center hover:bg-spa-bg/10 hover:text-white transition-colors">
                 <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-spa-bg/10 text-center">
          <p className="opacity-70">© 2026 Lively Foot - 活力足. 版權所有.</p>
        </div>
      </footer>
    </div>
  );
}
