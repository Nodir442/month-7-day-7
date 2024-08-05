import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoServise = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3600/" }),
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => ({
        url: "/todos",
      }),
      providesTags: ["get-todo"],
    }),
    createTodo: build.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-todo"],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["get-todo"],
    }),
    updateTodo: build.mutation({
      query: (data) => ({
        url: `/todos/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["get-todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoServise;
