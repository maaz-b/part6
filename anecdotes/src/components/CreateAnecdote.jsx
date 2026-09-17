import { useAnecdoteActions } from "../store";

const CreateAnecdote = () => {
  const { createAnecdote } = useAnecdoteActions();
  const addNew = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;

    createAnecdote(content, 0);
    e.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export { CreateAnecdote };
