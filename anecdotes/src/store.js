import { create } from "zustand";
import {
  getAnecdotes,
  voteAnecdote,
  createAnecdote,
  deleteAnecdote,
  // deleteAnecdote,
} from "./services/anecdotes";
import { useNotificationStore } from "./notification-store";

const fireNotification = (text) => {
  const {
    actions: { showNotification },
  } = useNotificationStore.getState();

  showNotification(text);
};

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: null,
  actions: {
    createAnecdote: async (anecdote) => {
      const newAnecdote = await createAnecdote(anecdote);
      fireNotification("New anecdote created.");

      return set((state) => ({
        anecdotes: [...state.anecdotes, newAnecdote],
      }));
    },

    setFilter: (newFilter) => set(() => ({ filter: newFilter })),
    voteAnecdote: async (anecdoteId) => {
      const oldAnecdote = get().anecdotes.find((n) => n.id === anecdoteId);
      const newAnecdote = await voteAnecdote(anecdoteId, {
        ...oldAnecdote,
        votes: oldAnecdote.votes + 1,
      });
      fireNotification(`you voted '${newAnecdote.content}'`);
      return set((state) => {
        const newList = state.anecdotes.map((item) =>
          item.id === anecdoteId ? newAnecdote : item,
        );
        const newsortedlist = newList.toSorted((a, b) => b.votes - a.votes);
        return { anecdotes: newsortedlist };
      });
    },

    removeAnecdote: async (anecdoteId) => {
      await deleteAnecdote(anecdoteId);
      set((state) => ({
        anecdotes: state.anecdotes.filter((e) => e.id !== anecdoteId),
      }));
    },

    initialize: async () => {
      const newAnecdotes = await getAnecdotes();

      return set(() => ({
        anecdotes: newAnecdotes,
      }));
    },
  },
}));

const useAnecdotes = () => {
  const filter = useAnecdoteStore((state) => state.filter);
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  if (filter && filter !== "") {
    return anecdotes
      .filter((element) => element.content.includes(filter))
      .toSorted((a, b) => b.votes - a.votes);
  } else {
    return anecdotes.toSorted((a, b) => b.votes - a.votes);
  }
};

const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions);

export { useAnecdotes, useAnecdoteActions, useAnecdoteStore };
