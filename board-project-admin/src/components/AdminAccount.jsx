// components/AdminAccount.jsx
export default function AdminAccount({
  form,
  handleChange,
  createAdminAccount,
  adminAccountList,
}) {
  return (
    <div className="manager-div">
      <section className="manager-section">
        <h2>관리자 계정 발급</h2>
        <table>
          <tbody>
            <tr>
              <td>사용할 이메일 : </td>
              <td>
                <input
                  id="email"
                  type="email"
                  placeholder="ex) admin2@kh.or.kr"
                  value={form.email}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>사용할 이름 : </td>
              <td>
                <input
                  id="nickname"
                  type="text"
                  placeholder="ex) 관리자2"
                  value={form.nickname}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>사용할 전화번호 : </td>
              <td>
                <input
                  id="tel"
                  type="text"
                  placeholder="ex) 01012341234"
                  value={form.tel}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="issueBtn" onClick={createAdminAccount}>
          발급
        </button>
      </section>

      <section className="manager-section">
        <h2>관리자 계정 목록</h2>
        <table className="manager-list-table" border={1}>
          <thead>
            <tr>
              <th>번호</th>
              <th>이메일</th>
              <th>관리자명</th>
            </tr>
          </thead>
          <tbody>
            {adminAccountList.map((member, index) => (
              <tr key={index}>
                <td>{member.memberNo}</td>
                <td>{member.memberEmail}</td>
                <td>{member.memberNickname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
