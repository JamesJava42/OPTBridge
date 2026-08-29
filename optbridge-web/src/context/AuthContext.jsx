import { createContext, useContext, useMemo, useState } from 'react';
import { demoAccounts } from '../data/portalData.js';

const AuthContext = createContext(null);
const SESSION_KEY = 'optbridge-demo-session';
const STAFF_KEY = 'optbridge-demo-staff-accounts';
const portalDemoEnabled = import.meta.env.DEV || import.meta.env.VITE_ENABLE_PORTAL_DEMO === 'true';

function readSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession);

  const login = (username, password) => {
    let managedStaff = [];
    try { managedStaff = JSON.parse(localStorage.getItem(STAFF_KEY)) || []; } catch { managedStaff = []; }
    const accounts = demoAccounts.map((account) => {
      const managed = managedStaff.find((staff) => staff.username === account.username);
      return managed ? { ...account, status: managed.status } : account;
    }).concat(managedStaff.filter((staff) => !demoAccounts.some((account) => account.username === staff.username)));
    const account = accounts.find(
      (candidate) => candidate.username.toLowerCase() === username.trim().toLowerCase() && candidate.password === password
    );

    if (!account) return { ok: false, message: 'Username or password is incorrect.' };
    if (import.meta.env.PROD && (!portalDemoEnabled || account.role !== 'subscriber')) {
      return { ok: false, message: 'This public release supports the student portal preview only. Contact support for account access.' };
    }
    if (account.status === 'suspended') return { ok: false, message: 'This account has been suspended by an administrator.' };
    if (account.role === 'subscriber' && account.subscription !== 'active') {
      return { ok: false, message: 'An active subscription is required to access the tracker.' };
    }

    const safeUser = Object.fromEntries(Object.entries(account).filter(([key]) => key !== 'password'));
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    return { ok: true, user: safeUser };
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
