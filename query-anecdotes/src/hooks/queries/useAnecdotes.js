import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllAnecdotes,
  createAnecdote,
  updateAnecdote,
} from "../../api/anecdotesService";

const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAllAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const oldAnecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], oldAnecdotes.concat(newAnecdote));
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (newAnecdote) => {
      const oldAnecdotes = queryClient.getQueryData(["anecdotes"]);
      const newAnecdotes = oldAnecdotes.map((anecdote) =>
        anecdote.id === newAnecdote.id ? newAnecdote : anecdote,
      );
      queryClient.setQueryData(["anecdotes"], newAnecdotes);
    },
  });

  return {
    anecdotes: query.data,
    isPending: query.isPending,
    isError: query.isError,
    addAnecdote: (anecdote) => createMutation.mutate(anecdote),
    updateAnecdote: (anecdote) => updateMutation.mutate(anecdote),
  };
};

export { useAnecdotes };
