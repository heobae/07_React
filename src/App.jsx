import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Exam1 from "./components/Exam1";
import Exam2 from "./components/Exam2";
import Exam3 from "./components/Exam3";
import Exam4 from "./components/Exam4";
import Exam5 from "./components/Exam5";

function App() {
  // 상태(state)
  const [showExam, setShowExam] = useState(true);

  return (
    // js 주석
    // <></> : fragment (html에서 역할, 해석x)
    /*
    <>
     jsx 주석 
      <>
        <h1>hello</h1>
        <h1>hello</h1>
      </>
      <>
        <h1>hello</h1>
        <h1>hello</h1>
      </>
    </>  => 형제관계끼리 작성할 수 없어서 그들을 감싸는 태그가 필요함
    */

    // <>
    //   <button onClick={() => setShowExam(!showExam)}>클릭</button>

    //   {/* showExam이 true면 화면에 Exam1 컴포넌트 호출하여 렌더링함 */}
    //   {showExam && <Exam2 br="BR" test="test" />}
    // </>

    // <Exam3 />

    // <Exam4 />

    <Exam5 />
  );
}

export default App;
