import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/queries/useAnecdotes";

const App = () => {
  const { anecdotes, isPending, isError, updateAnecdote } = useAnecdotes();

  const handleVote = (anecdote) => {
    const anecdoteToSend = { ...anecdote, votes: anecdote.votes + 1 };
    updateAnecdote(anecdoteToSend);
  };

  if (isPending) {
    return <div>Loading anecdotes ...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
