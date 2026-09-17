const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
  try {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(baseUrl, options);

    if (!response.ok) {
      throw "Failed to fetch anecdotes";
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const createAnecdote = async (content) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        votes: 0,
      }),
    };
    const response = await fetch(baseUrl, options);
    if (!response.ok) {
      throw "Failed to create anecdotes";
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const voteAnecdote = async (id, body) => {
  try {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(`${baseUrl}/${id}`, options);
    if (!response.ok) {
      throw "Failed to vote anecdotes";
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteAnecdote = async (id) => {
  try {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(`${baseUrl}/${id}`, options);
    if (!response.ok) {
      throw "Failed to delete anecdotes";
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { getAnecdotes, createAnecdote, voteAnecdote, deleteAnecdote };
