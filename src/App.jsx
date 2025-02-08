import { useState } from 'react';
import './App.css'

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [따봉, 따봉변경] = useState([0, 0, 0])


  // let [a, b] = useState('oooo');
  // a : state에 보관했던 자료
  // b : state를 변하게 하는 함수
  // state 변경은 등호 사용 X
  /* 
    state 변경하는 법
    -> state변경함수(새로운state)

    state 변경함수 원리
    -> 기존 state == 신규 state 일 경우 변경X
    
    array/object특징
    -> 자바스크립트에서는 변수의 주소만 저장해둠
    -> var, let, const로 선언한 변수는 할당해준 변수와 주소가 같음
    -> 변수의 주소가 같으면 변수1 == 변수2 해도 true임
    -> 따라서 스프레드문법[...]은 변수의 주소를 변경함
    --> 변수의 주소자체를 변경해줘야 state가 변경됨
    --> state가 array/object이면 독립적 카피본(shallow copy)을 만들어 수정해야함
   */

  /* 
    일반 변수는 html에 바로 반영 X
    state 변수는 해당 변수가 포함되어있는 html 모두 재렌더링 되어 반영
    --> 자주 변경될 것 같은 html을 state로 만들어두면 좋다(빡대가리식)
   */
  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <button onClick={()=>{
        let copy = [...글제목];
        copy.sort((a, b)=> a.localeCompare(b))
        글제목변경(copy)
      }}>가나다순 정렬</button>


      <button onClick={()=>{
        let copy = [...글제목];
        copy[0] = '여자 코트 추천';
        글제목변경(copy)
      }}>글수정</button>

      {글제목.map((title, i) => (
        <div className="list" key={i}>
          <h4>{title} <span onClick={()=>{
            let copy = [...따봉];
            copy[i] = copy[i]+1
            따봉변경(copy)
          }}>👍</span> {따봉[i]} </h4>
          <p>2월 17일 발행</p>
        </div>
        ))
      }
    </div>
  )
}

export default App
