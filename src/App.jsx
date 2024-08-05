import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { Card } from "./components/Card";
import { useForm } from "react-hook-form";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "./redux/service/todo-api";

function App() {
  const { error, data, isLoading } = useGetTodosQuery();
  const [createTodo, { isLoading: createLoading }] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [deletingIds, setDeletingIds] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const submit = (formData) => {
    if (editingTodo) {
      updateTodo({
        id: editingTodo.id,
        ...formData,
      })
        .unwrap()
        .catch((error) => {
          console.log("error", error);
        });
      setEditingTodo(null);
    } else {
      createTodo({
        id: nanoid(),
        ...formData,
      })
        .unwrap()
        .catch((error) => {
          console.log("error", error);
        });
    }
    reset();
  };

  const handleDelete = (id) => {
    setDeletingIds((prev) => [...prev, id]);
    deleteTodo(id)
      .unwrap()
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setDeletingIds((prev) => prev.filter((deleteId) => deleteId !== id));
      });
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setValue("title", todo.title);
    setValue("description", todo.description);
  };

  return (
    <>
      <div className="mx-auto w-[500px]">
        {createLoading ? <h2>Loading...</h2> : ""}
        <form onSubmit={handleSubmit(submit)}>
          <div>
            <input
              className="mb-2 w-full rounded-lg border-[1px] border-black bg-blue-400 p-4 text-2xl text-white placeholder:text-white"
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Name"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div>
            <input
              className="mb-2 w-full rounded-lg border-[1px] border-black bg-blue-400 p-4 text-2xl text-white placeholder:text-white"
              {...register("description", {
                required: "Description is required",
              })}
              type="text"
              placeholder="Description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <button
            className="mb-3 rounded-lg border-[2px] bg-green-400 px-4 py-2 font-semibold text-white transition-all duration-300 hover:border-green-400 hover:bg-white hover:text-green-400"
            type="submit"
          >
            {editingTodo ? "Update" : "Send"}
          </button>
        </form>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="mx-auto w-[500px]">
            {data.map((item) => (
              <Card
                key={item.id}
                {...item}
                handleDelete={() => handleDelete(item.id)}
                handleEdit={() => handleEdit(item)}
                isDeleting={deletingIds.includes(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
