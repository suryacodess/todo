import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./sass/Main.css";

export default function TodoList() {
  const [todo, setTodo] = useState(" ");
  const [newTodo, setNewTodo] = useState([]);
  const [editList, setEditList] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(true);

  //send email
  const form = useRef();

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const addTodo = () => {
    if (todo === " " && todo.length < 4) {
      alert("please enter your todo");
    }

    //edit functionality - 2
    else if (todo && !toggleBtn) {
      setNewTodo(
        newTodo.map((elem) => {
          if (elem.id === editList) {
            return { ...elem, todoList: todo };
          }
          return elem;
        })
      );
      setTodo(" ");
      setToggleBtn(true);
    }

    //add functionality
    else {
      let randomNum = Math.random().toString();
      const allTodoList = { id: randomNum.slice(2, 6), todoList: todo };
      setNewTodo((list) => {
        return [...list, allTodoList];
      });
      setTodo(" ");
    }
  };

  //delete functionality
  const deleteTodo = (index) => {
    setNewTodo((list) => {
      return list.filter((todo) => {
        return index !== todo.id;
      });
    });
  };

  //edit functionality - 1
  const editTodoList = (todo, index) => {
    setTodo(todo);
    setEditList(index);
    setToggleBtn(false);
  };

  //clear all functionality
  const clearBtn = () => {
    setNewTodo([]);
  };

  //send email functionality
  const sendEmail = (e) => {
    // console.log(newTodo);
    let userEmail = document.getElementById("userEmail");
    e.preventDefault();

    if (newTodo.length === 0) {
      e.preventDefault();
      alert("please enter your todo first");
    } else if (newTodo.length > 0) {
      e.preventDefault();
      emailjs
        .sendForm(
          "service_x0pug68",
          "template_ea69cdk",
          form.current,
          "t6cKRaVZ_kBzWYU2J"
        )
        .then(
          () => {
            alert("successfully sent to your email :)");
            setNewTodo([]);
            userEmail.value = " ";
          },
          (error) => {
            alert(error.text);
          }
        );
    }
  };

  return (
    <>
      {/* header */}
      <header className="header">
        <div className="title">
          <h1>Todo App</h1>
        </div>
        <div className="clear-btn">
          <form onSubmit={sendEmail} ref={form}>
            <input
              required
              type="email"
              name="user_email"
              id="userEmail"
              placeholder="enter email to send todo"
            />
            <textarea
              className="none"
              name="message"
              id="message"
              readOnly
              value={newTodo.map((todo) => "- " + todo.todoList)}
            ></textarea>

            <button onClick={sendEmail}>send</button>
          </form>
          <div className="btns">
            <button onClick={clearBtn} title="reset">
              clear
            </button>
            <button onClick={clearBtn} className="resetBtn">
              <i
                className="fa-sharp fa-solid fa-rotate-right"
                title="reset"
              ></i>
            </button>
          </div>
        </div>
      </header>

      {/* main todo app */}
      <main className="todo-app">
        <section className="todo-app-inner">
          <section className="todo-input">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              placeholder="enter your todo"
            />
            {toggleBtn ? (
              <button onClick={addTodo}>
                <i
                  className="fa-sharp fa-solid fa-plus"
                  title="create todo"
                ></i>
              </button>
            ) : (
              <button onClick={addTodo}>
                <i className="fa-solid fa-pen-to-square" title="edit todo"></i>
              </button>
            )}
          </section>
          <section className="todo-list">
            <div>
              {newTodo.map((todo) => {
                return (
                  <div className="todo-list-items" key={todo.id}>
                    <div>
                      <p id="todoData">{todo.todoList}</p>
                    </div>
                    <div className="todo-list-btns">
                      <button id={todo.id} onClick={() => deleteTodo(todo.id)}>
                        <i
                          className="fa-solid fa-trash"
                          title="delete todo"
                        ></i>
                      </button>
                      <button
                        id={todo.id}
                        onClick={() => editTodoList(todo.todoList, todo.id)}
                      >
                        <i
                          className="fa-solid fa-pen-to-square"
                          title="edit todo"
                        ></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
