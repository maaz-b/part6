const baseUrl = "http://localhost:3001/anecdotes";
const headers = { "Content-Type": "application/json" };

const checkResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    if (errorData.error) {
      throw errorData.error;
    }
    throw "Something went wrong";
  }
};

const getAllAnecdotes = async () => {
  const response = await fetch(baseUrl);

  await checkResponse(response);
  return await response.json();
};

const createAnecdote = async (newAnecdote) => {
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newAnecdote),
  };
  const response = await fetch(baseUrl, options);

  await checkResponse(response);
  return await response.json();
};

const updateAnecdote = async (newAnecdote) => {
  const options = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(newAnecdote),
  };

  const response = await fetch(`${baseUrl}/${newAnecdote.id}`, options);

  await checkResponse(response);
  return await response.json();
};

export { getAllAnecdotes, createAnecdote, updateAnecdote };
