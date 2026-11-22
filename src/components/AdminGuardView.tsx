'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ShieldAlert, LogIn, LogOut } from 'lucide-react';

interface AdminGuardViewProps {
  mode: 'login' | 'forbidden';
  userEmail?: string;
}

export function AdminGuardView({ mode, userEmail }: AdminGuardViewProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.errors?.[0]?.message || data?.message || 'פרטי ההתחברות שגויים');
        setLoading(false);
        return;
      }

      const roles: string[] = Array.isArray(data?.user?.roles) ? data.user.roles : [];
      if (!roles.includes('admin')) {
        setError('המשתמש שהתחברת אליו אינו בעל הרשאות מנהל מערכת (Admin).');
        setLoading(false);
        router.refresh();
        return;
      }

      router.refresh();
    } catch {
      setError('שגיאת תקשורת בהתחברות. נסו שוב.');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-slate-50"
      dir="rtl"
    >
      <div className="mb-6 flex flex-col items-center gap-2">
        <img
          src="/logo.png"
          alt="אגודת ידידי הממ״ח"
          className="h-12 w-auto object-contain"
        />
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 p-8 space-y-6 rounded-2xl shadow-sm">
        {mode === 'forbidden' ? (
          <>
            <div className="flex items-center gap-3 text-red-700">
              <div className="w-11 h-11 bg-red-50 flex items-center justify-center shrink-0 rounded-xl">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900">אין הרשאת גישה</h1>
                <p className="text-xs text-slate-500">האתר זמין למנהלי מערכת בלבד</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 text-sm text-slate-700 space-y-1.5 rounded-xl">
              <p>
                אזור זה מוגבל למשתמשים בעלי הרשאת <strong>מנהל מערכת (Admin)</strong> בלבד.
              </p>
              {userEmail && (
                <p className="text-xs text-slate-500">
                  מחובר כעת: <strong className="text-slate-800">{userEmail}</strong>
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-navy hover:bg-brand-navyLight text-white font-bold text-sm rounded-xl transition-colors cursor-pointer disabled:opacity-60"
            >
              <LogOut className="w-4 h-4" />
              <span>התנתק והתחבר עם חשבון מנהל</span>
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0 rounded-xl">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-black text-brand-navy">כניסת מנהלים</h1>
                <p className="text-xs text-slate-500">
                  הגישה לאתר מוגבלת למשתמשים בעלי הרשאת מנהל בלבד
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-800">דוא״ל</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-sm text-slate-900 rounded-xl focus:bg-white focus:outline-none focus:border-brand-navy"
                  dir="ltr"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-800">סיסמה</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 text-sm text-slate-900 rounded-xl focus:bg-white focus:outline-none focus:border-brand-navy"
                  dir="ltr"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-navy hover:bg-brand-navyLight text-white font-bold text-sm rounded-xl transition-colors cursor-pointer disabled:opacity-60"
              >
                <LogIn className="w-4 h-4" />
                <span>{loading ? 'מתחבר...' : 'התחברות למערכת'}</span>
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-center text-xs text-slate-500">
              <Link href="/admin" className="text-brand-navy font-bold hover:underline">
                מעבר לפאנל Payload Admin
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
