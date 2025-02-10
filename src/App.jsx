/* eslint-disable react/prop-types */
import { useState } from 'react';
import './App.css'

function App() {

  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [따봉, 따봉변경] = useState([0, 0, 0])
  let [modal, setModal] = useState(false);
  let [index, setIndex] = useState(0);
  let [입력값, 입력값변경] = useState('');


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


    일반 변수는 html에 바로 반영 X
    state 변수는 해당 변수가 포함되어있는 html 모두 재렌더링 되어 반영
    --> 자주 변경될 것 같은 html을 state로 만들어두면 좋다(빡대가리식)


    컴포넌트 만들기
    1. function생성
    2. return()안에 html담기
    3. <함수명></함수명>쓰기

    컴포넌트로 만들면 좋은것
    -> 반복적인 html 축약할 때
    -> 큰 페이지들
    -> 자주 변경되는 것들


    동적인 UI 만들기
    1. html css로 미리 디자인 완성
    2. UI의 현재상태를 state로 저장
    3. state에 따라 UI가 어떻게 보일지 작성


    map함수
    1. array의 요소 갯수만큼 콜백함수를 실행시켜줌
    2. 함수의 parameter는 array의 각 요소임
    3. return에 적으면 array로 담아줌
    -> 반복문으로 html 생성하면 key={} 추가 필요

    부모 -> 자식 state 전송
    1. <자식컴포넌트 작명={state이름}>
    --> props 전송은 부모에서 자식으로만 가능

  */
  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>

      <div style={{marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center"}}>
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
      </div>

      {글제목.map((title, i) => (
        <div className="list" key={i}>
          <h4 onClick={()=>{
            setIndex(i)
            setModal(!modal)
            }}>
          {title}
            <span
              onClick={(e)=>{
                e.stopPropagation();
                let copy = [...따봉];
                copy[i] = copy[i]+1
                따봉변경(copy)
            }}> 👍</span> {따봉[i]} 
          </h4>
          <p>2월 17일 발행</p>
          <button onClick={()=>{
            let copy = [...글제목];
            copy.splice(i, 1);
            글제목변경(copy);
          }}>삭제</button>
        </div>
        ))
      }

      <input type="text" id='inputText' onChange={(e)=>{
        입력값변경(e.target.value)
        }} />
      <button onClick={()=>{
        if(입력값 == ''){
          alert('값을 입력하세요');
          return;
        }
        let copy = [...글제목];
        let copy2 = [...따봉];
        copy2.unshift(0);
        copy.unshift(입력값);
        글제목변경(copy);
        따봉변경(copy2);
        입력값변경('');
      }}>글발행</button>

      {
        modal == true ? <Modal color='skyblue' 글제목변경={글제목변경} index={index} 글제목={글제목}/> : null
      }

    </div>
  )
}

function Modal(props){
  return(
    // <></> fragment문법
    <div className="modal" style={{backgroundColor : props.color}}>
      <h4>{props.글제목[props.index]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{
        let copy = [...props.글제목];
        copy[0] = '여자 코트 추천';
        props.글제목변경(copy)
      }}>글수정</button>
    </div>
  );
}


export default App
