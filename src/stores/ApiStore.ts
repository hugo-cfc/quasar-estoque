/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';
import useSupabase from 'src/boot/supabase';
import { useAuthStore } from './AuthStore';

const { supabase } = useSupabase();
const { user } = useAuthStore();

export const useApiStore = defineStore('api', {
  state: () => ({
    user: {} as any,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user.user_metadata,
  },
  actions: {
    list: async (table: string) => {
      const { data, error } = await supabase.from(table).select('*');

      if (error) throw error;

      return data;
    },
    getById: async (table: string, id: string) => {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id);

      if (error) throw error;

      return data[0];
    },
    post: async (table: string, form: any) => {
      const { data, error } = await supabase
        .from(table)
        .insert([{ ...form, user_id: user.id }]);

      if (error) throw error;

      return data;
    },
    update: async (table: string, form: any) => {
      const { data, error } = await supabase
        .from(table)
        .update([{ ...form, user_id: user.id }])
        .match({ id: form.id });

      if (error) throw error;

      return data;
    },
    remove: async (table: string, id: string) => {
      const { data, error } = await supabase.from(table).delete().match({ id });

      if (error) throw error;

      return data;
    },
  },
});
