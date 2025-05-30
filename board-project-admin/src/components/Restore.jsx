import React, { useEffect, useState } from "react";
import { axiosAPi } from "../api/axiosAPI";

export default function Restore() {
  const [withdrawnMembers, setWithdrawnMembers] = useState(null); // 탈퇴 회원 목록 상태 선언
  const [deleteBoard, setDeleteBoard] = useState(null); // 삭제 게시글 목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 탈퇴한 회원 목록 조회용 함수
  const getWithdrawnMemberList = async () => {
    try {
      const resp = await axiosAPi.get("/admin/withdrawnMemberList");
      console.log(resp.data);

      if (resp.status === 200) {
        setWithdrawnMembers(resp.data);
      }
    } catch (error) {
      console.log("탈퇴 회원 목록 조회 중 에러 발생 : ", error);
    }
  };
  // 탈퇴한 회원 복구 요청 함수
  const restoreMember = async (member) => {
    // 복구 요청
    // 복구 되었음 하고 응답옴
    // -> 여기에 만들어야 getWithdrawnMemberList를 밑으로 또 props 안 함
    if (
      window.confirm(member.memberNickname + "님을 탈퇴 복구 시키겠습니까?")
    ) {
      try {
        const resp = await axiosAPi.put("/admin/restoreMember", {
          memberNo: member.memberNo,
        });

        if (resp.status === 200) {
          alert("복귀 되었습니다!");
          getWithdrawnMemberList(); // 복구 되면 탈퇴한 회원 재호출 (새로고침용) 꼭 필요!!
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 삭제된 게시글 목록 조회용 함수
  const getDeleteBoardList = async () => {
    try {
      const resp = await axiosAPi.get("/admin/deleteBoardList");
      console.log(resp.data);

      if (resp.status === 200) {
        setDeleteBoard(resp.data);
      }
    } catch (error) {
      console.log("삭제된 게시글 목록 조회 중 에러 발생 : ", error);
    }
  };
  // 삭제된 게시글 복구 요청 함수
  const restoreBoard = async (board) => {
    if (window.confirm(board.boardNo + "번 게시글을 복구 시키겠습니까?")) {
      try {
        const resp = await axiosAPi.put("/admin/restoreBoard", {
          boardNo: board.boardNo,
        });

        if (resp.status === 200) {
          alert("복귀 되었습니다!");
          getDeleteBoardList(); // 복구 되면 탈퇴한 회원 재호출 (새로고침용) 꼭 필요!!
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Restore 컴포넌트가 처음 렌더링 될 때 useEffect
  useEffect(() => {
    getWithdrawnMemberList();
    getDeleteBoardList();
  }, []);

  // withdrawnMembers, deleteBoard 상태가 변경될 때 실행될 useEffect (isLoading값 변경)
  useEffect(() => {
    if (withdrawnMembers != null && deleteBoard != null) {
      setIsLoading(false);
    }
  }, [withdrawnMembers, deleteBoard]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="menu-box">
        <RestoreMember
          withdrawnMembers={withdrawnMembers}
          restoreMember={restoreMember}
        />

        <RestoreBoard deleteBoard={deleteBoard} restoreBoard={restoreBoard} />
      </div>
    );
  }
}

const RestoreBoard = ({ deleteBoard, restoreBoard }) => {
  return (
    <section className="section-border">
      <h2>삭제 게시글 복구</h2>

      <h3>삭제된 게시글 목록</h3>
      {deleteBoard.length === 0 ? (
        <p>삭제되 게시글이 없습니다</p>
      ) : (
        deleteBoard.map((board, index) => (
          <ul className="ul-board" key={index}>
            <li>게시글 번호 : {board.boardNo}</li>
            <li>게시글 카테고리명 : {board.boardName}</li>
            <li>게시글 제목 : {board.boardTitle}</li>
            <li>게시글 작성자 : {board.memberNickname}</li>
            <button className="restoreBtn" onClick={() => restoreBoard(board)}>
              복구
            </button>
          </ul>
        ))
      )}
    </section>
  );
};

const RestoreMember = ({ withdrawnMembers, restoreMember }) => {
  return (
    <section className="section-border">
      <h2>탈퇴 회원 복구</h2>

      <h3>탈퇴한 회원 목록</h3>

      {withdrawnMembers.length === 0 ? (
        <p>탈퇴한 회원이 없습니다.</p>
      ) : (
        // index를 얻어오는 이유 : 식별가능한 키값을 불러오기 위해
        withdrawnMembers.map((member, index) => {
          // 중괄호 열리면 return, return 안 쓸거면 ()로 바꾸기
          return (
            <ul className="ul-board" key={index}>
              <li>회원 번호 : {member.memberNo}</li>
              <li>회원 이메일 : {member.memberEmail}</li>
              <li>회원 닉네임 : {member.memberNickname}</li>
              <button
                className="restoreBtn"
                onClick={() => restoreMember(member)}
              >
                복구
              </button>
            </ul>
          );
        })
      )}
    </section>
  );
};
