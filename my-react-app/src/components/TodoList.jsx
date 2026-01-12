// React만을 이용한 TodoList 예제

import { useState } from "react";

const TodoList = () => {
  // 작성한 Todo를 기억할 List(배열) 상태
  const [todoList, setTodoList] = useState([{title : '123', isDone : false}, {title: '44444', isDone : false}]);
  // 새로운 할 일 제목 작성 input의 value 상태
  const [inputValue, setInputValue] = useState("");
  

function handleAddTodo() {
  // Javascript spread(전개) 연산자 (...)
  // : 배열이나 객체같이 여러 데이터가 모여있는 형태를 낱개로 뿌려(펼쳐)주는 기능
  
  setTodoList([...todoList, {title:inputValue, isDone:false} ]);
  /*
    [ {title : '123', isDone : false},
      {title : '44444', isDone : false},
      {title : inputValue, isDone : false}
    ]
      => 기존 todoList가 가진 배열의 요소를 낱개로 펼치고 뒤에 새로운 요소를 추가
      => 새로운 배열이 생성됨! 이 새로운 배열을 상태인 todoList에 전달하여 세팅
      => React 불변성의 법칙 지킴!
  */ 

}

// 완료/미완료 상태 업데이트 이벤트 핸들러 함수
const handleToggleTodo = (index) => {
  /* 기존 todoList 상태
    [{title : '123', isDone : false}, 
    {title: '44444', isDone : false}]
  */ 
  const newTodoList = todoList.map((todo, i) => index == i ? {...todo, isDone : !todo.isDone} : todo);

  setTodoList(newTodoList);
  // 현재 배열의 i와 매개변수 index가 같으면 isDone 값을 반대값으로 변경한 내용으로 사용,
  // 같지 않으면 기존 todo를 그대로 적용하여 새로운 배열을 만들어 반환(map 사용)

}

// todoList에 있는 요소를 삭제하는 이벤트 핸들러 함수
const handleDeleteTodo = (index) => {
  // filter : 배열의 요소 중 특정 조건을 만족하는 요소들만 걸러내어 새로운 배열을 반환하는 함수
  // -> filter는 원본 유지 함수 (불변성 지킴)
  const newTodoList = todoList.filter((todo, i) => i !== index);

  // i와 index값이 일치하지 않는 요소들만 모아 새로운 배열로 반환
  // 즉, 클릭한 요소를 제외한 요소들이 모인 배열 생성! => 삭제 기능
  setTodoList(newTodoList); // 새롭게 생성한 배열을 상태에 세팅

}

  return (
    <div>
      <h1>나의 TodoList</h1>
      <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>

      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>
            <span style={{textDecoration : todo.isDone ? "line-through" : "none"}}>{todo.title}</span>
            <button onClick={() => handleToggleTodo(index)}>{todo.isDone ? '미완료' : '완료'}</button>
            <button onClick={() => handleDeleteTodo(index)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default TodoList;