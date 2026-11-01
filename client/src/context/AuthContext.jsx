import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './authContextInstance';
import { DEMO_USERS } from '../data/mockUsers';

const STORAGE_KEY = 'civicreflex_auth_user_v4';
const USERS_STORAGE_KEY = 'civicreflex_all_users_v4';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
      // Default to citizen demo profile on first visit
      return DEMO_USERS.CITIZEN;
    } catch {
      return DEMO_USERS.CITIZEN;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Auth state storage error', e);
    }
  }, [user]);

  /**
   * Simulated Login with account status check
   */
  const login = useCallback((email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check demo accounts first
    let foundUser = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    // 2. Check all users directory in localStorage (if updated by admin)
    try {
      const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        const liveMatch = parsedUsers.find((u) => u.email.toLowerCase() === cleanEmail);
        if (liveMatch) {
          // If password matches or standard demo password
          if (!foundUser && password === 'password123') {
            foundUser = liveMatch;
          } else if (foundUser) {
            // Overlay live accountStatus and suspensionReason from admin directory
            foundUser = {
              ...foundUser,
              accountStatus: liveMatch.accountStatus,
              suspensionReason: liveMatch.suspensionReason
            };
          }
        }
      }
    } catch (e) {
      console.warn('User status check error', e);
    }

    if (foundUser) {
      if (foundUser.accountStatus === 'Suspended') {
        return {
          success: false,
          error: `Access Denied: Account (${foundUser.name}) has been suspended by the System Administrator. Reason: ${foundUser.suspensionReason || 'Violation of portal acceptable use policy'}.`
        };
      }

      setUser(foundUser);
      return { success: true, user: foundUser };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please verify your demonstration email and security password.'
    };
  }, []);

  /**
   * Fast Demo Login by Role
   */
  const loginAsDemo = useCallback((roleName) => {
    const targetKey = roleName.toUpperCase();
    let targetUser = DEMO_USERS[targetKey];

    if (!targetUser) {
      targetUser = Object.values(DEMO_USERS).find(
        (u) => u.role.toLowerCase() === roleName.toLowerCase()
      );
    }

    if (targetUser) {
      // Check live status
      try {
        const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
        if (savedUsers) {
          const parsed = JSON.parse(savedUsers);
          const live = parsed.find((u) => u.id === targetUser.id || u.email.toLowerCase() === targetUser.email.toLowerCase());
          if (live && live.accountStatus === 'Suspended') {
            return null;
          }
        }
      } catch {}

      setUser(targetUser);
      return targetUser;
    }
    return null;
  }, []);

  /**
   * Update Profile Details
   */
  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const role = user?.role || 'guest';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: Boolean(user),
        login,
        loginAsDemo,
        updateProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
