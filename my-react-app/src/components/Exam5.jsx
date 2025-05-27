// JSX 예제

import { useState } from "react";
import tomato from "../assets/토마토.png";

const Exam5 = () => {
  // return <Exam5_1 />;
  // return <Exam5_2 />;
  // return <Exam5_3 isLogin={true} />;
  // return <Exam5_4 isLogin={false} />;
  return <Exam5_5 />;
};

// JSX 예제 1 : 자바스크립트 변수로 사용하기
const Exam5_1 = () => {
  const name = "React";
  const element = <h1>Hello, {name}</h1>;

  return element;
};

// JSX 예제 2 : img 태그 이미지 사용
const Exam5_2 = () => {
  const [userImg, setUserImg] = useState(
    "data:image/jpeg;base64,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"
  );

  return <img src={tomato} />;
};

// JSX 예제 3 : 로그인 여부에 따라 화면 다르게 보이기
const Exam5_3 = ({ isLogin }) => {
  // 조건문 사용!
  if (isLogin) {
    return <h1>환영합니다!</h1>;
  } else {
    return <h1>로그인 해주세요!</h1>;
  }
};

// JSX 예제 4 : 로그인 여부에 따라 화면 다르게 보이기 (삼항 연산자)
const Exam5_4 = (props) => {
  return <h1>{props.isLogin ? "환영합니다!" : "로그인 해주세요!"}</h1>;
};

// JSX 예제 5 : 배열을 이용한 화면 렌더링 방법 (*** 중요 : 자주 사용!! ***)
// - 클라이언트 (React) <-> 서버 (SpringBoot)
// - 서버에서 응답받은 데이터는 대부분 배열(List) 형태!
const Exam5_5 = () => {
  // 서버에서 아래 배열(List)를 응답받았다고 가정
  const members = ["데빌구", "유리", "철수", "훈발놈", "갓맹구"];

  // JS 내장함수 중 배열을 하나씩 순차접근해서 콜백함수 내에 있는 내용 수행 후
  // 새로운 배열을 만들어 반환하는 함수 -> map
  // [ <li>데빌구</li>, <li>유리</li>... <li>갓맹구</li>]

  // 1. filter - 콜백함수 내에 있는 걸 걸러서 필요한 것만 추출
  // 2. *map*
  // 3. reduce - 누적하는 것

  const listItems = members.map((mem, index) => <li key={index}>{mem}</li>);

  // Each child in a list should have a unique "key" prop.
  // -> React에서 동적인 리스트를 렌더링 할 때
  // 각 자식 컴포넌트가 고유한 key 속성을 가져야 한다는 규칙 위배시 발생하는 경고!
  // 고유한 key값 작성하면 경고 해결 -> 보통 key값은 index값으로 사용함

  return <ul>{listItems}</ul>;
};

export default Exam5;
