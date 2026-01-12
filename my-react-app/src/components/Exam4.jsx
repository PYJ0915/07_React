// 상태 끌어 올리기 (State lifting up)
// : 자식 컴포넌트의 상태를 부모에게 끌어올려 부모에서 이용가능하도록 해주는 것

import { useState } from "react"

// 부모 컴포넌트
const Exam4 = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  // id 상태값을 업데이트 해주는 함수
  function onChangeId(e) {
    setId(e.target.value);
  }

  // pw 상태값을 업데이트 해주는 함수
  const onChangePw = (e) => {
    setPw(e.target.value);
  };


  return (
    <div>
      {/* 자식 컴포넌트에게 사용중인 함수들을 props 통해 전달 */}
      <Id onChangeId={onChangeId}/>
      <Pw onChangePw={onChangePw}/>
      <div>
        {/* 자식이 가진 id, pw라는 상태값을 부모 컴포넌트가 알 방법이 없음! 
            => 부모 컴포넌트로 자식의 상태, 함수를 끌어올려 사용 */}
        <button disabled={id.length === 0 || pw.length === 0}>Login</button>
      </div>
    </div>
  )
}

// 자식 컴포넌트 Id
const Id = (props) => {


  return (
    <div>
      <label>ID :</label>
      <input onChange={props.onChangeId} />
    </div>
  )
}

// 자식 컴포넌트 Pw
const Pw = ({onChangePw}) => {


  return (
    <div>
      <label>Pw :</label>
      <input type="password" onChange={onChangePw} />
    </div>
  )
}

export default Exam4