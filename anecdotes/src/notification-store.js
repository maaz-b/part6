import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
  message: null,
  timerId: null,
  actions: {
    showNotification: (newMessage) => {
      const oldTimer = get().timerId;
      if (oldTimer) {
        clearTimeout(oldTimer);
      }

      const newTimerId = setTimeout(() => {
        set({ message: null, timerId: null });
      }, 5000);

      set(() => ({ message: newMessage, timerId: newTimerId }));
    },

    clearNotification: () => {
      const oldTimer = get().timerId;
      if (oldTimer) {
        clearTimeout(oldTimer);
      }
      set(() => ({ message: null, timerId: null }));
    },
  },
}));

const useNotification = () => useNotificationStore((state) => state.message);

const useNotoficationActions = () =>
  useNotificationStore((state) => state.actions);

export { useNotoficationActions, useNotification, useNotificationStore };
