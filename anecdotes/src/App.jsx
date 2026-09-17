import { AnecdotesList } from "./components/AnecdotesList";
import { CreateAnecdote } from "./components/CreateAnecdote";
import { FilterAnecdotes } from "./components/FilterAnecdotes";
import { useEffect } from "react";
import { useAnecdoteActions } from "./store";
import { Notification } from "./components/Notification";

const App = () => {
  const { initialize } = useAnecdoteActions();
  useEffect(() => {
    initialize();
  }, [initialize]);
  return (
    <div>
      <Notification />
      <FilterAnecdotes />
      <AnecdotesList />
      <CreateAnecdote />
    </div>
  );
};

export default App;
