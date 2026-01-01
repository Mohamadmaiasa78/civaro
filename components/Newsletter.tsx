
import React, { useState } from 'react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-black border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-8 block italic">Exclusive Access</span>
        <h2 className="text-3xl md:text-5xl font-serif mb-12 tracking-tight">Join the Inner Circle</h2>
        
        {status === 'success' ? (
          <div className="animate-in fade-in zoom-in duration-700 space-y-4">
             <p className="text-white text-sm md:text-base font-light italic tracking-widest uppercase">Welcome to the selection. Confirmation sent.</p>
             <button onClick={() => setStatus('idle')} className="text-[8px] tracking-[0.4em] uppercase text-white/30 hover:text-white underline underline-offset-8">Return</button>
          </div>
        ) : (
          <>
            <p className="text-white/50 font-light mb-12 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
              Sign up to receive early access to new collections, exclusive event invitations, and insights into masculine refinement.
            </p>
            
            <form className="max-w-md mx-auto relative group" onSubmit={handleSubmit}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-[10px] tracking-[0.3em] focus:outline-none focus:border-white transition-colors placeholder:text-white/20 uppercase"
                disabled={status === 'loading'}
              />
              <button 
                type="submit" 
                className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:translate-x-1 transition-transform ${status === 'loading' ? 'opacity-20 animate-pulse' : ''}`}
                disabled={status === 'loading'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};
