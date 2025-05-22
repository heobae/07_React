// Context API 란?
// React 컴포넌트 트리 전체에서 데이터를 공유할 수 있는 방법을 제공
// 부모자식간 관계가 중첩된 구조에서 데이터를 전달하는데 있어 불필요한
// props drilling(상태 내리꽂기)을 방지함.
// 사용하기 위해서 useContext hook 필요함.

import { createContext, useContext, useState } from "react";

// Context API를 사용하려면 객체가 필요
// React.createContext() : Context 객체를 생성 시 사용하는 함수
// Context : react에서 컴포넌트 계층 구조를 통해
//           데이터를 효율적으로 전달하기 위한 메커니즘 (작동원리/방식)
// Provider : 데이터를 제공 (Exam6)
// Consumer : 데이터를 소비 (Child3)
const UserContext = createContext(); // import 해줘야 함

// 부모 컴포넌트
const Exam6 = () => {
  const [user, setUser] = useState("홍길동");

  // Context.Provider : 하위 컴포넌트에게 데이터를 전달할 때 (제공할 때) 사용
  return (
    <UserContext.Provider value={{ user, test: "test값 입니다." }}>
      <h1>부모 : 부모가 가진 상태 값 {user}</h1>
      <Child1 />
    </UserContext.Provider>
  );
};

const Child1 = () => {
  return (
    <>
      <h1>Child1</h1>
      <Child2 />
    </>
  );
};

const Child2 = () => {
  const contextValue = useContext(UserContext);
  return (
    <>
      <h1>
        Child2 : {contextValue.user} / {contextValue.test}
      </h1>
      <Child3 />
    </>
  );
};

const Child3 = () => {
  // Exam6가 가진 user 상태 값을 사용하고 싶다!

  const contextValue = useContext(UserContext);
  // Context로 등록된 객체 중 이름이 UserContext를 꺼내어
  return (
    <>
      <h1>
        Child3 : {contextValue.user} / {contextValue.test}
      </h1>
    </>
  );
};

export default Exam6;
