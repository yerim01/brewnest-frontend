import { create } from "zustand";
import api from "@/lib/api/api";

interface UserProfile {
    username: string;
    email?: string;
}

interface UserProfileState {
    profile: UserProfile | null;
    fetchUserProfile: () => Promise<void>;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
    profile: null,
    fetchUserProfile: async () => {
    try {
      const res = await api.get("http://localhost:8000/accounts/auth/user/");
      set({ profile: res.data });
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      throw error;
    }
  },
}))