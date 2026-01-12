import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Exam1 from './components/Exam1'
import Exam2 from './components/Exam2'
import Exam3 from './components/Exam3'
import Exam4 from './components/Exam4'
import Exam5 from './components/Exam5'
import TodoList from './components/TodoList'
import Exam6 from './components/Exam6'
import Exam7 from './components/Exam7'

function App() {
  // 상태 (state) => 필수 X
  // const [count, setCount] = useState(0) 
  const [showExam, setShowExam] = useState(true);

  return (
    // JS 주석
    //  <></> : fragment (html 역할 X) => 감쌀 태그가 마땅히 없을 때 사용
    <>
      {/* JSX 주석 */}
      {/* <h1>안녕하세요!</h1> */}
      {/* <button onClick={() => setShowExam(!showExam)}>클릭</button>
      {showExam && <Exam2 mihyun="hello" test="world" />} */}
      {/* 조건부 렌더링 : 조건에 따라 렌더링 되는 방법
        && 앞에 있는 showExam이 true면 Exam1 렌더링 O, false면 렌더링 X
      */}
      {/* <Exam3 /> */}

      {/* <Exam4 /> */}

      {/* <Exam5 /> */}

      {/* <TodoList /> */}

      {/* <Exam6 /> */}
      <Exam7 />

    </>
  )
}

export default App
