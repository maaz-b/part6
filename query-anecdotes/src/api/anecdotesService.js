const baseUrl = "http://localhost:3001/anecdotes";
const headers = { "Content-Type": "application/json" };

const getAllAnecdotes = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw "Something went wrong";
  }

  return await response.json();
};

const createAnecdote = async (newAnecdote) => {
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newAnecdote),
  };
  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw "Something went wrong";
  }

  return await response.json();
};

const updateAnecdote = async (newAnecdote) => {
  const options = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(newAnecdote),
  };

  const response = await fetch(`${baseUrl}/${newAnecdote.id}`, options);

  if (!response.ok) {
    throw "Something went wrong";
  }

  return await response.json();
};

export { getAllAnecdotes, createAnecdote, updateAnecdote };
