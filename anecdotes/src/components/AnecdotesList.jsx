import { useAnecdotes, useAnecdoteActions } from "../store";

const AnecdotesList = () => {
  const anecdotes = useAnecdotes();

  const deleteAnecdoete = (id) => {
    // if (window.confirm("Are you sure you want to delete this anecdote?")) {
    removeAnecdote(id);
    // }
  };

  const { voteAnecdote, removeAnecdote } = useAnecdoteActions();
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => voteAnecdote(anecdote.id)}
            >
              vote
            </button>
            {anecdote.votes === 0 && (
              <button
                onClick={() => deleteAnecdoete(anecdote.id)}
                style={{ color: "red", marginLeft: "10px" }}
              >
                delete
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export { AnecdotesList };
