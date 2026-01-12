// 함수형 컴포넌트 예제

import { useEffect, useState } from "react"

// const Exam2 = () => {} => 화살표 함수도 가능!
function Exam2({mihyun, test}) {
  //            props or key값
  // 상태 정의
  const [count, setCount] = useState(0);
  
  // useEffect 함수형 컴포넌트에서 랜더링 이후 실행되는 코드(부수효과)를 작성할 때 사용하는 hook
  // 클래스형 Component의 componentDidMount, componentDidUpdate, componentWillUnmount와 같은 기능 사용 가능!
  useEffect(() => {
    // 이 안의 코드는 컴포넌트가 렌더링된 후 실행됨(부수 효과 == side effect)
    console.log("마운트 완료 또는 업데이트 됨.")
    // componentDidMount or componentDidUpdate 기능

    return () => {
      // clean-up 코드 : 언마운트 시 실행
       console.log("언마운트 완료.")
       // componentWillUnmount 기능
    }
  }, [count]); // 의존성 배열
  // 경우 1) 의존성 배열 미작성 : 컴포넌트가 리렌더링될 때마다 매번 실행 (무분별한 렌더링으로 인한 성능 저하)
  // 경우 2) 빈배열 작성 : 마운트 시 1회 실행, 언마운트 시 return 구문 1회 실행
  // 경우 3) 배열에 값 작성 : 배열에 있는 값이 업데이트될 때마다 실행
  // => 이전 Effect 정리(clean-up) -> 그 다음 새로운 Effect 실행(마운트)

  const handleClick = () => {
    setCount(count + 1);
  };

  // 렌더링
  return (
    <div>
      <h1>Count : {count}</h1>
      <button onClick={handleClick}>증가 버튼</button>

       <h2>
        부모로부터 전달받은 값 : {mihyun} {test}
      </h2>
    </div>
  )
}

export default Exam2
