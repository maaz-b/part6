import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllAnecdotes,
  createAnecdote,
  updateAnecdote,
} from "../../api/anecdotesService";

import { useNotify } from "../useNotify";

const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotify();

  const result = useQuery({
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
      notify(`anecdote '${newAnecdote.content}' created`);
    },
    onError: (error) => {
      console.log(error);
      notify(error);
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
      notify(`anecdote '${newAnecdote.content}' voted`);
    },
    onError: (error) => {
      console.log(error);
      notify(error);
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (anecdote) => createMutation.mutate(anecdote),
    updateAnecdote: (anecdote) => updateMutation.mutate(anecdote),
  };
};

export { useAnecdotes };
