import { create } from "zustand";
import type { User } from "../lib/types";
import { axiosInstance } from "../lib/axios";

interface authArg {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: null;
  isCheckingAuth: boolean;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: ( email: string, password: string) => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<authArg>((set, get) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/register", {
        username: name,
        email,
        password,
      });
      set({ user: res.data.user, isAuthenticated: true });
    } catch (error) {
      //   console.error(error.response.data.message);
      console.error(error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
  verifyEmail: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/verify-email", {
        code,
        email: get().user?.email,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (email, password) => {
    set({isLoading: true, error: null});
    try {
      const res = await axiosInstance.post("/login", {email, password});
      set({
        isAuthenticated: true,
        user: res.data.user,
      })
    } catch (error) {
      console.log(error);
      throw error;
    } finally{
      set({isLoading: false});
    }
  },
  checkAuth: async () => {
    set({isCheckingAuth: true, error: null})
    try {
      const res = await axiosInstance.get("/check");
      set({user: res.data.user, isAuthenticated: true});
    } catch (error) {
      console.log(error);
    } finally{
      set({isCheckingAuth: false});
    }
  },
}));
