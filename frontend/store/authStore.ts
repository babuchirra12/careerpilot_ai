import type { User } from "../types/user";

export const authStore = {
  user: null as User | null,
  setUser(user: User | null) {
    this.user = user;
  },
};
