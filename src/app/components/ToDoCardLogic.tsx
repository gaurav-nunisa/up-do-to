"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const ToDoCardLogic = ({
  dayIdProps,
  day,
}: {
  dayIdProps: string;
  day: string;
}) => {
  const [newTodo, setNewTodo] = useState<
    Array<{ _id?: string; text: string; completed: boolean; day: string }>
  >([{ text: "", completed: false, day: "" }]);

  const [dbTodos, setDbTodos] = useState<
    Array<{
      _id?: string;
      text: string;
      completed: boolean;
      day: string;
    }>
  >([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`/api/days/${dayIdProps}`);
        setDbTodos(response.data || []);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        setDbTodos([]);
      }
    };

    if (dayIdProps) {
      fetchTodos();
    }
  }, [dayIdProps]);

  const updateTodo = async (
    todoId: string,
    updatedText: string,
    completed: boolean
  ) => {
    try {
      const response = await axios.put(`/api/todos/${todoId}`, {
        text: updatedText,
        completed: completed,
        day: dayIdProps,
      });
      const newPutInputs = dbTodos.map((input) =>
        input._id === todoId
          ? {
              ...input,
              text: updatedText,
              completed: completed,
            }
          : input
      );
      setDbTodos(newPutInputs);
      return response.data;
    } catch (error) {
      console.error("Failed to update todo:", error);
      throw error;
    }
  };

  const handleClick = (e: React.MouseEvent, index: number) => {
    const newHandleClickInputs = [...newTodo];
    newHandleClickInputs[index].day = dayIdProps;
    setNewTodo(newHandleClickInputs);
  };

  const createTodo = async (todo: {
    text: string;
    completed: boolean;
    day: string;
  }) => {
    try {
      const response = await axios.post("/api/todos", {
        ...todo,
        day: dayIdProps,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`/api/todos/${todoId}`);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      try {
        e.preventDefault();
        const existingTodo = dbTodos[index];

        if (existingTodo?._id) {
          if (existingTodo.text.trim()) {
            await updateTodo(
              existingTodo._id,
              existingTodo.text,
              existingTodo.completed
            );
            const response = await axios.get(`/api/days/${dayIdProps}`);
            setDbTodos(response.data);
          }
         
        }
        const currentTodo = newTodo[index];
        if (currentTodo?.text.trim()) {
          const response = await createTodo(currentTodo);
          console.log("created todo:", response);

          const updatedTodos = await axios.get(`/api/days/${dayIdProps}`);
          setDbTodos(updatedTodos.data);

          setNewTodo([
           
            { text: "", completed: false, day: dayIdProps },
          ]);
        }
        const nextTodo = newTodo[index + 1];
        if (nextTodo && nextTodo.text.trim() === "") {
          setNewTodo([...newTodo]);
      }
      } catch (error) {
        console.error("Failed to create todo:", error);
      }
    }
    if (e.key === "Backspace") {
      const todoToDelete = dbTodos[index];
      if (todoToDelete && todoToDelete._id && todoToDelete.text.trim() === "") {
          try {
              await deleteTodo(todoToDelete._id);
              const response = await axios.get(`/api/days/${dayIdProps}`);
              setDbTodos(response.data);
          } catch (error) {
              console.error("Failed to delete todo:", error);
          }
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    todoId: string | null
  ) => {
    if (todoId) {
      setDbTodos((prev) =>
        prev.map((input) =>
          input._id === todoId ? { ...input, text: e.target.value } : input
        )
      );
    } else {
      const handleChangeNewToDo = [...newTodo];
      handleChangeNewToDo[index].text = e.target.value;
      setNewTodo(handleChangeNewToDo);
    }
  };

  const toggleCompleted = async (index: number, todoId: string) => {
    try {
      const todo = newTodo[index];
      const response = await axios.put(`/api/todos/${todo._id}`, {
        completed: !todo.completed,
      });

      setDbTodos((prev) =>
        prev.map((input) =>
          input._id === todoId
            ? { ...input, completed: !input.completed }
            : input
        )
      );

      const updatedItems = [...newTodo];
      updatedItems[index].completed = !updatedItems[index].completed;
      setNewTodo(updatedItems);
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  return (
    <div className="p-4 space-y-2 flex-row ">
      {/* Render existing todos */}
      {dbTodos.map((input, index) => (
        <div key={input._id || index} className="flex">
          <input
            type="text"
            value={input.text}
            onChange={(e) => handleChange(e, index, input._id)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            className={`bg-transparent border-b border-gray-500 text-black 
              placeholder-gray-400 focus:outline-none focus:border-blue-500 
              focus:ring-0 p-2 w-full ${
                input.completed ? "line-through text-gray-400" : ""
              }`}
          />
          <input
            type="checkbox"
            checked={input.completed}
            className="checkbox w-4 h-4 cursor-pointer"
            onChange={() => toggleCompleted(index, input._id)}
          />
        </div>
      ))}

      {/* New todo input */}
      <div className="flex ">
        <input
          type="text"
          value={newTodo[newTodo.length - 1].text}
          onClick={(e) => handleClick(e, newTodo.length - 1)}
          onChange={(e) => handleChange(e, newTodo.length - 1, null)}
          onKeyDown={(e) => handleKeyPress(e, newTodo.length - 1)}
          className="bg-transparent border-b border-gray-500 text-black 
            placeholder-gray-400 focus:outline-none focus:border-blue-500 
            focus:ring-0 p-2 w-full"
          placeholder="Add new todo..."
        />
      </div>
    </div>
  );
};

export default ToDoCardLogic;
