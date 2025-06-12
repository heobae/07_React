// React만을 이용한 TodoList 예제
import { useEffect, useState } from "react";
import { axiosAPi } from "../api/axiosAPI";

export default function TodoList() {
  const [todoList, setTodoList] = useState([]); // null말고 빈배열로!
  const [isLoading, setIsLoading] = useState(true);
  // input한걸 기억하는 객체
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  // todoList 목록 불러오는 함수
  const getTodoList = async () => {
    try {
      const resp = await axiosAPi.get("/todo/todoList");
      setTodoList(resp.data);
    } catch (error) {
      console.error("할 일 목록 불러오기 실패:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  useEffect(() => {
    if (todoList != null) setIsLoading(false);
  }, [todoList]);

  if (isLoading) return <p>로딩 중입니다...</p>;

  // Add Todo 버튼 클릭 시 todoList 상태에 업데이트 이벤트 핸들러 함수
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    // const addTodo = { title: inputValue, complete: false };

    try {
      // 전개 역할로 ...todoList 사용함
      // (기존 todoList가 가진 배열을 펼치고 뒤에 새로운 요소를 추가)
      const resp = await axiosAPi.post("/todo/addTodo", {
        todoTitle: inputValue,
        todoContent: inputValue2,
        complete: "N",
      });
      setTodoList([...todoList, resp.data]);
      // setTodoList();
      setInputValue(""); // 작성완료 후 input창 값 비우기
      setInputValue2(""); // 작성완료 후 input창 값 비우기
      console.log(resp.data);
      getTodoList();
    } catch (error) {
      console.log("할 일 추가 중 에러가 발생했습니다 : ", error);
    }
  };

  // 완료/미완료 상태 업데이트 이벤트 핸들러 함수
  const handleToggleTodo = async (todoNo, currentStatus) => {
    try {
      await axiosAPi.put("/todo/todoChange", {
        todoNo: todoNo,
        complete: currentStatus === "Y" ? "N" : "Y",
      });

      setTodoList(
        todoList.map((todo) =>
          todo.todoNo === todoNo
            ? { ...todo, complete: todo.complete === "Y" ? "N" : "Y" }
            : todo
        )
      );
    } catch (error) {
      console.log("todo 상태 변경 실패 : ", error);
    }
  };

  // todoList에 있는 현재 상태(todo요소)를 삭제하는 이벤트 핸들러 함수
  const handleDeleteTodo = async (todoNo) => {
    try {
      await axiosAPi.delete(`/todo/todoDelete/${todoNo}`);
      setTodoList(todoList.filter((todo) => todo.todoNo !== todoNo));
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <div>
      <h1>나의 TodoList</h1>
      제목:{" "}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddTodo();
        }}
      />{" "}
      내용:{" "}
      <input
        type="text"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAddTodo();
        }}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todoList.map((todo) => {
          console.log("👉 각 Todo 객체:", todo);
          return (
            <li key={todo.todoNo}>
              <span
                style={{
                  textDecoration:
                    todo.complete === "Y" ? "line-through" : "none",
                }}
              >
                제목: {todo.todoTitle} / 내용: {todo.todoContent}
              </span>{" "}
              {/* 콜백함수 없으면 index가 클릭 안 해도 실행됨 */}
              <button
                onClick={() => handleToggleTodo(todo.todoNo, todo.complete)}
              >
                {todo.complete === "Y" ? "미완료" : "완료"}
              </button>{" "}
              {/* react는 삼항연산자로 */}
              <button onClick={() => handleDeleteTodo(todo.todoNo)}>
                삭제
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
