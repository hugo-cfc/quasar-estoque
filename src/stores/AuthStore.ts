/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import useSupabase from 'src/boot/supabase';

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterData extends LoginProps {
  name: string;
}

interface User {
  email: string;
  user_metadata: RegisterData;
}

const { supabase } = useSupabase();

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as User,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user.user_metadata,
  },
  actions: {
    async login({ email, password }: LoginProps) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return data;
    },
    async logout() {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    },
    async register({ email, password, ...meta }: RegisterData) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: meta,
          emailRedirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
        },
      });

      if (error) throw error;

      return data;
    },
    async update(user: any) {
      const { data, error } = await supabase.auth.updateUser(user);

      if (error) throw error;

      return data;
    },
    async sendPasswordRestEmail(email: string) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;

      return data;
    },
    async loginWithSocialProvider(provider: any) {
      const { data, error } = await supabase.auth.updateUser(provider);

      if (error) throw error;

      return data;
    },
    async resetPassword(newPassword: string) {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      return data;
    },
    setUser(value: any) {
      this.user = { ...this.user, ...value };
    },
  },
});

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);

  const { setUser } = useAuthStore();

  setUser(session?.user);
});
