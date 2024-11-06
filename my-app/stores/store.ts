import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Définir les types pour les valeurs du store
interface User {
  // Ajoute les champs spécifiques de l'utilisateur que tu veux stocker
  id: number;
  email: string;
  isVerified: boolean;
  nom: string;
  prenoms: string;
  password: string;
  tel: string;
  verificationCode: any;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setToken: (token: string) => set({ token }),
      setUser: (user: User) => set({ user }),
      clearAuth: () => set({ token: null, user: null }),
      isAuthenticated: () => !!get().token,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
