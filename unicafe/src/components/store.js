import { create } from "zustand";

const useUnicafeStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    addGood: () => set((state) => ({ good: state.good + 1 })),
    addNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
    addBad: () => set((state) => ({ bad: state.bad + 1 })),
  },
}));

const useGood = () => useUnicafeStore((state) => state.good);
const useNeutral = () => useUnicafeStore((state) => state.neutral);
const useBad = () => useUnicafeStore((state) => state.bad);
const useUnicafeActions = () => useUnicafeStore((state) => state.actions);

const useAvg = () =>
  useUnicafeStore((state) => {
    const total = state.bad + state.good + state.neutral;
    if (total === 0) {
      return 0;
    }
    return (state.good - state.bad) / total;
  });

const usePositivePercentage = () =>
  useUnicafeStore((state) => {
    const total = state.good + state.bad + state.neutral;
    if (total === 0) {
      return 0;
    }
    return (state.good / total) * 100;
  });

const useAll = () =>
  useUnicafeStore((state) => {
    return state.good + state.bad + state.neutral;
  });

export {
  useGood,
  useAvg,
  useBad,
  useAll,
  useNeutral,
  useUnicafeActions,
  usePositivePercentage,
};
