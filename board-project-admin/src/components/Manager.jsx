import React, { useEffect, useState } from "react";
import { axiosAPi } from "../api/axiosAPI";
import AdminAccount from "./AdminAccount";

export default function Manager() {
  // 이메일, 닉네임, 전화번호
  // const [email, setEmail] = useState(""); <- 이거 안 쓰고
  // 객체 하나로 상태 관리하는 방식
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    tel: "",
  });
  const [adminAccountList, setAdminAccountList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 객체형태의 상태 변경 함수
  const handleChange = (e) => {
    const { id, value } = e.target; // 대상의 id속성값, value값을 꺼내옴
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 관리자 계정 발급
  async function createAdminAccount() {
    // 일반함수에서는 async를 function 왼쪽에!!
    const { email, nickname, tel } = form; // form 상태 안에 있는 값들 하나씩 꺼내오기

    if (email.length === 0 || nickname.length === 0 || tel.length === 0) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    try {
      const response = await axiosAPi.post("/admin/createAdminAccount", {
        memberEmail: email,
        memberNickname: nickname,
        memberTel: tel, // DTO에 맞는 변수명!!
      });

      if (response.status === 201) {
        const result = response.data; // 서버에서 응답해준 데이터 (body)
        alert(
          `발급된 비밀번호는 ${result}입니다. 다시 확인할 수 없으니 저장해주시기 바랍니다.`
        );
        console.log(result);
      }

      // 입력 필드 초기화
      setForm({
        email: "",
        nickname: "",
        tel: "",
      });
    } catch (error) {
      alert(error.response.data);
      // 409, 500일 때 응답받은 body 내용이 반영되어 alert에 출력할 수 있게끔 함.
    }
  }

  // 관리자 계정 목록 조회용 함수
  const getadminAccountList = async () => {
    try {
      const resp = await axiosAPi.get("/admin/adminAccountList");
      console.log(resp.data);

      if (resp.status === 200) {
        setAdminAccountList(resp.data);
      }
    } catch (error) {
      console.log("관리자 계정 목록 조회 중 레어 발생 : ", error);
    }
  };

  useEffect(() => {
    getadminAccountList();
  }, []);

  useEffect(() => {
    if (adminAccountList != null) {
      setIsLoading(false);
    }
  }, [adminAccountList]);

  // const AdminAccount = ({ adminAccountList }) => {
  //   return (
  //     <>
  //       <div className="manager-div">
  //         <section className="manager-section">
  //           <h2>관리자 계정 발급</h2>
  //           <table>
  //             <tr>
  //               <td>사용할 이메일 : </td>
  //               <td>
  //                 <input
  //                   id="email"
  //                   type="email"
  //                   placeholder="ex) admin2@kh.or.kr"
  //                   value={form.email}
  //                   onChange={handleChange}
  //                 />
  //               </td>
  //             </tr>
  //             <tr>
  //               <td>사용할 이름 : </td>
  //               <td>
  //                 <input
  //                   id="nickname"
  //                   type="text"
  //                   placeholder="ex) 관리자2"
  //                   value={form.nickname}
  //                   onChange={handleChange}
  //                 />
  //               </td>
  //             </tr>
  //             <tr>
  //               <td>사용할 전화번호 : </td>
  //               <td>
  //                 <input
  //                   id="tel"
  //                   type="text"
  //                   placeholder="ex) 01012341234"
  //                   value={form.tel}
  //                   onChange={handleChange}
  //                 />
  //               </td>
  //             </tr>
  //           </table>
  //           <button className="issueBtn" onClick={createAdminAccount}>
  //             발급
  //           </button>
  //         </section>

  //         <section className="manager-section">
  //           <h2>관리자 계정 목록</h2>
  //           {adminAccountList.length === 0 ? (
  //             <p>관리자 계정이 없습니다.</p>
  //           ) : (
  //             <table className="manager-list-table" border={1}>
  //               <thead>
  //                 <tr>
  //                   <th>번호</th>
  //                   <th>이메일</th>
  //                   <th>관리자명</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {adminAccountList.map((member, index) => (
  //                   <tr key={index}>
  //                     <td>{member.memberNo}</td>
  //                     <td>{member.memberEmail}</td>
  //                     <td>{member.memberNickname}</td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           )}
  //         </section>
  //       </div>
  //     </>
  //   );
  // };

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <AdminAccount
          form={form}
          handleChange={handleChange}
          createAdminAccount={createAdminAccount}
          adminAccountList={adminAccountList}
        />
      </div>
    );
  }
}
