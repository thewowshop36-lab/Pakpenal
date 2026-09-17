import React, { useState } from 'react';

// سروسز ڈیٹا
const initialServices = [
  { id: 1, platform: 'YouTube', name: 'YouTube Monetization Package (1K Subs + 4K Hours)', pricePKR: 45000, priceUSDT: 150, icon: '▶️', badge: 'Most Popular' },
  { id: 2, platform: 'TikTok', name: 'TikTok Creator Rewards & Followers', pricePKR: 13500, priceUSDT: 45, icon: '🎵', badge: 'Fast Delivery' },
  { id: 3, platform: 'Facebook', name: 'Facebook Page Monetization Watchtime', pricePKR: 36000, priceUSDT: 120, icon: '📘', badge: 'Verified' },
  { id: 4, platform: 'Instagram', name: 'Instagram Real Active Followers', pricePKR: 7500, priceUSDT: 25, icon: '📸', badge: 'Trending' },
  { id: 5, platform: 'WhatsApp', name: 'VIP WhatsApp Trading/Tech Group Access', pricePKR: 4500, priceUSDT: 15, icon: '💬', badge: 'Instant' },
  { id: 6, platform: 'Telegram', name: 'Telegram Premium Channel & Signals', pricePKR: 6000, priceUSDT: 20, icon: '✈️', badge: 'VIP Only' },
];

export default function App() {
  const [view, setView] = useState('user'); // 'user' یا 'admin'
  const [selectedService, setSelectedService] = useState(null);
  const [userLink, setUserLink] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('JazzCash');
  const [txId, setTxId] = useState('');
  const [orders, setOrders] = useState([
    { id: 101, service: 'YouTube Monetization Package', link: 'https://youtube.com/@example', payment: 'JazzCash', tx: 'JC987654321', status: 'Pending', date: '2026-09-17' }
  ]);
  const [submitted, setSubmitted] = useState(false);

  // آرڈر سبمٹ کرنے کا فنکشن
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!userLink || !txId) return;

    const newOrder = {
      id: Date.now().toString().slice(-4),
      service: selectedService.name,
      link: userLink,
      payment: paymentMethod,
      tx: txId,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    setOrders([newOrder, ...orders]);
    setSubmitted(true);
  };

  // ایڈمن کے لیے آرڈر کا اسٹیٹس بدلنے کا فنکشن
  const toggleOrderStatus = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: o.status === 'Pending' ? 'Completed' : 'Pending' } : o));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center border-b border-slate-800/80 sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('user')}>
          <span className="text-3xl">🚀</span>
          <h1 className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            SocialMonetize Hub
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setView(view === 'user' ? 'admin' : 'user')}
            className="bg-slate-900 border border-slate-700 hover:border-blue-500 px-4 py-2 rounded-xl text-xs font-bold transition text-blue-400"
          >
            {view === 'user' ? '🔐 Admin Dashboard' : '🌐 Customer View'}
          </button>
        </div>
      </header>

      {/* یوزر ویو */}
      {view === 'user' ? (
        <main className="max-w-7xl mx-auto px-6 py-10">
          
          {/* Hero */}
          <section className="text-center max-w-3xl mx-auto mb-16">
            <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block mb-4">
              ✨ 100% Secure & Verified Monetization Services
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
              Grow & Monetize Your Social Media With <span className="bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">Local & Crypto Payments</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base">
              Pay easily via JazzCash, EasyPaisa, or OKX USDT. Fast delivery for YouTube, TikTok, Facebook, and VIP Groups.
            </p>
          </section>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {initialServices.map((item) => (
              <div 
                key={item.id}
                onClick={() => { setSelectedService(item); setSubmitted(false); setTxId(''); setUserLink(''); }}
                className="bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl p-3 bg-slate-800/80 rounded-xl border border-slate-700 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h3>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xs text-slate-400 block">Price</span>
                    <span className="text-lg font-black text-emerald-400">Rs. {item.pricePKR.toLocaleString()} <span className="text-xs text-slate-400">({item.priceUSDT} USDT)</span></span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition">
                    Order Now ⚡
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout / Order Modal Section */}
          {selectedService && (
            <section className="max-w-xl mx-auto bg-slate-900 border border-blue-500/40 rounded-3xl p-8 shadow-2xl relative mb-20">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-xs text-blue-400 font-bold uppercase">Selected Package</span>
                  <h3 className="text-xl font-black text-white">{selectedService.name}</h3>
                </div>
                <button onClick={() => setSelectedService(null)} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full text-xs">✕</button>
              </div>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-6 rounded-2xl text-center space-y-2">
                  <p className="text-3xl">🎉</p>
                  <h4 className="font-bold text-lg">Order Placed Successfully!</h4>
                  <p className="text-xs text-emerald-400/80">Our team will verify your transaction ID and process your order within 2-6 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Your Channel / Profile Link or Contact</label>
                    <input 
                      type="text" 
                      required
                      placeholder="https://youtube.com/@channel or @username" 
                      value={userLink}
                      onChange={(e) => setUserLink(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Select Payment Method</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['JazzCash', 'EasyPaisa', 'OKX USDT'].map((method) => (
                        <button
                          type="button"
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`py-2.5 rounded-xl text-xs font-bold border transition ${paymentMethod === method ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Instructions Box - آپ کے فراہم کردہ اصلی اکاؤنٹس کے ساتھ */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-1.5 text-slate-300">
                    <p className="font-bold text-blue-400">Payment Instructions ({paymentMethod}):</p>
                    
                    {paymentMethod === 'JazzCash' && (
                      <div>
                        <p>Send <span className="text-emerald-400 font-bold">Rs. {selectedService.pricePKR}</span> to JazzCash:</p>
                        <p className="font-mono text-white mt-1">📱 Number: <b>03134876720</b></p>
                        <p className="font-mono text-white">👤 Name: <b>Allah Ditta</b></p>
                      </div>
                    )}

                    {paymentMethod === 'EasyPaisa' && (
                      <div>
                        <p>Send <span className="text-emerald-400 font-bold">Rs. {selectedService.pricePKR}</span> to EasyPaisa:</p>
                        <p className="font-mono text-white mt-1">📱 Number: <b>03134876720</b></p>
                        <p className="font-mono text-white">👤 Name: <b>Allah Ditta</b></p>
                      </div>
                    )}

                    {paymentMethod === 'OKX USDT' && (
                      <div>
                        <p>Send <span className="text-emerald-400 font-bold">${selectedService.priceUSDT} USDT (TRC20)</span> to OKX:</p>
                        <p className="font-mono text-white mt-1 break-all bg-slate-900 p-2 rounded border border-slate-800"><b>TV7QzoSkw9Patn8tFakrrg6BnNSCBBrNSJ</b></p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Transaction ID / Trx ID / Hash</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter 11-digit Trx ID or Crypto Hash" 
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold py-3.5 rounded-xl text-sm shadow-lg transition"
                  >
                    Confirm & Submit Order 🚀
                  </button>
                </form>
              )}
            </section>
          )}
        </main>
      ) : (
        /* ایڈمن ڈیش بورڈ ویو */
        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-white">Admin Dashboard</h2>
              <p className="text-xs text-slate-400">Manage client orders, verify payments, and update statuses.</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs">
              Total Orders: <span className="text-blue-400 font-bold">{orders.length}</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">User Link</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Trx ID</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-4 font-mono text-slate-400">#{o.id}</td>
                      <td className="p-4 font-bold text-white">{o.service}</td>
                      <td className="p-4 text-blue-400 truncate max-w-xs"><a href={o.link} target="_blank" rel="noreferrer">{o.link}</a></td>
                      <td className="p-4 font-semibold text-slate-300">{o.payment}</td>
                      <td className="p-4 font-mono text-emerald-400">{o.tx}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${o.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => toggleOrderStatus(o.id)}
                          className={`px-3 py-1.5 rounded-lg font-bold transition text-[11px] ${o.status === 'Pending' ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
                        >
                          {o.status === 'Pending' ? 'Mark Completed' : 'Revert'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>© 2026 SocialMonetize Hub. Secure Automated Panel with JazzCash, EasyPaisa & OKX USDT Support.</p>
      </footer>
    </div>
  );
}
