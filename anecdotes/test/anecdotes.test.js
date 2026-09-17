import { describe, test, beforeEach, vi, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useAnecdoteStore,
  useAnecdoteActions,
  useAnecdotes,
} from "../src/store";
vi.mock("../src/services/anecdotes", () => ({
  getAnecdotes: vi.fn(),
  createAnecdote: vi.fn(),
  voteAnecdote: vi.fn(),
  deleteAnecdote: vi.fn(),
}));
import { getAnecdotes, voteAnecdote } from "../src/services/anecdotes";

beforeEach(() => {
  vi.clearAllMocks();
  useAnecdoteStore.setState({ anecdotes: [], filter: null });
});

describe("Anecdotes operations: ", () => {
  test("Store has correct data in initialized state", async () => {
    const mockAnecdotes = [
      {
        content: "Adding manpower to a late software project makes it later!",
        id: "21149",
        votes: 0,
      },
    ];

    getAnecdotes.mockResolvedValue(mockAnecdotes);

    const { result: resultActions } = renderHook(() => useAnecdoteActions());
    await act(async () => {
      await resultActions.current.initialize();
    });

    const { result: resultAnecdotes } = renderHook(() => useAnecdotes());

    expect(resultAnecdotes.current).toEqual(mockAnecdotes);
  });

  test("Anecdotes are sorted by votes (decreasing order)", async () => {
    const mockAnecdotes = [
      {
        content: "Adding manpower to a late software project makes it later!",
        id: "21149",
        votes: 0,
      },
      {
        content: "Adding Lunpower to a late software project makes it harder!",
        id: "21150",
        votes: 2,
      },
    ];

    getAnecdotes.mockResolvedValue(mockAnecdotes);
    const { result: resultActions } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await resultActions.current.initialize();
    });

    const { result: resultAnecdotes } = renderHook(() => useAnecdotes());

    expect(resultAnecdotes.current[0].votes).toStrictEqual(2);
    expect(resultAnecdotes.current[1].votes).toStrictEqual(0);
  });

  test("Anecdotes are being filtered properly", async () => {
    const mockAnecdotes = [
      {
        content: "Adding manpower to a late software project makes it later!",
        id: "21149",
        votes: 0,
      },
      {
        content: "Now harder!",
        id: "21150",
        votes: 2,
      },
    ];

    getAnecdotes.mockResolvedValue(mockAnecdotes);
    const { result: resultActions } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await resultActions.current.initialize();
    });

    await act(async () => {
      await resultActions.current.setFilter("Now");
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());

    expect(anecdotesResult.current.length).toStrictEqual(1);
    expect(anecdotesResult.current[0].content).toStrictEqual("Now harder!");
  });

  test("Voting increases number of votes", async () => {
    const mockAnecdotes = [
      {
        content: "Adding manpower to a late software project makes it later!",
        id: "21149",
        votes: 0,
      },
    ];

    getAnecdotes.mockResolvedValue(mockAnecdotes);

    const { result: resultActions } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await resultActions.current.initialize();
    });

    const { result: resultOldAnecdotes } = renderHook(() => useAnecdotes());

    expect(resultOldAnecdotes.current[0].votes).toStrictEqual(0);

    const mockAnecdote = {
      content: "Adding manpower to a late software project makes it later!",
      id: "21149",
      votes: 1,
    };
    voteAnecdote.mockResolvedValue(mockAnecdote);

    await act(async () => {
      await resultActions.current.voteAnecdote("21149");
    });

    const { result: resultNewAnecdotes } = renderHook(() => useAnecdotes());

    expect(resultNewAnecdotes.current[0].votes).toStrictEqual(1);
  });
});
