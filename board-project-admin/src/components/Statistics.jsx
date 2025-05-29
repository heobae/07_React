import React, { useEffect, useState } from "react";
import { axiosAPi } from "../api/axiosAPI";

export default function Statistics() {
  const [readCountData, setReadCountData] = useState(null);
  const [likeCountData, setLikeCountData] = useState(null);
  const [commentCountData, setCommentCountData] = useState(null);
  const [newMemberCountData, setNewMemberCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // true면 로딩 중이라는 뜻, 서버에서 데이터 받아오면 false로 됨

  // 최대 조회 수 게시글 조회
  const getMaxReadCount = async () => {
    try {
      const resp = await axiosAPi.get("/admin/maxReadCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setReadCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 조회 수 게시글 조회 중 예외 발생 : ", error);
    }
  };

  // 최대 좋아요 수 게시글 조회
  const getMaxLikeCount = async () => {
    try {
      const resp = await axiosAPi.get("/admin/maxLikeCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setLikeCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 좋아요 수 게시글 조회 중 예외 발생 : ", error);
    }
  };

  // 최대 댓글 수 게시글 조회
  const getMaxCommentCount = async () => {
    try {
      const resp = await axiosAPi.get("/admin/maxCommentCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setCommentCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 댓글 수 게시글 조회 중 예외 발생 : ", error);
    }
  };

  // 신규 가입 회원 수 조회
  const getNewMemberCount = async () => {
    try {
      const resp = await axiosAPi.get("/admin/newMemberCount");
      console.log(resp.data);

      if (resp.status === 200) {
        setNewMemberCount(resp.data);
      }
    } catch (error) {
      console.log("신규 멤버 조회 중 에러 발생 : ", error);
    }
  };

  // 컴포넌트가 처음 마운트 될 때 딱 한 번만 실행
  // -> Statistics 컴포넌트가 화면에 마운트 될 때 서버로 세가지 데이터 요청, 응답 받아야 함.
  useEffect(() => {
    getMaxReadCount();
    getMaxLikeCount();
    getMaxCommentCount();
    getNewMemberCount();
  }, []); // 의존성 배열이 비어있기 때문에 1번만 실행

  // readCountData, likeCountData, commentCountData에 변화가 감지될 때 콜백함수 사용
  4; // -> IsLoading 상태값을 false로 변경
  useEffect(() => {
    if (
      readCountData != null &&
      likeCountData != null &&
      commentCountData != null &&
      newMemberCountData != null
    ) {
      setIsLoading(false);
    }
  }, [readCountData, likeCountData, commentCountData, newMemberCountData]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <section className="statistics-section">
          <h2>신규 가입 회원 ({newMemberCountData.length})명</h2>
          <h4>[7일 이내 가입 회원]</h4>
          <table>
            <thead>
              <tr>
                <th>회원 번호</th>
                <th>이메일</th>
                <th>닉네임</th>
                <th>가입일</th>
              </tr>
            </thead>
            <tbody>
              {newMemberCountData.map(())}
              <tr>
                <td>{newMemberCountData.memberNo}</td>
                <td>{newMemberCountData.memberEmail}</td>
                <td>{newMemberCountData.memberNickname}</td>
                <td>{newMemberCountData.enrollDate}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="statistics-section">
          <h2>가장 조회수 많은 게시글</h2>
          <p>게시판 종류 : {readCountData.boardName}</p>
          <p>
            게시글 번호/제목 : No.{readCountData.boardNo} /{" "}
            {readCountData.boardTitle}
          </p>
          <p>게시글 조회 수 : {readCountData.readCount}</p>
          <p>작성자 닉네임 : {readCountData.memberNickname}</p>
        </section>

        <section className="statistics-section">
          <h2>가장 좋아요 많은 게시글</h2>
          <p>게시판 종류 : {likeCountData.boardName}</p>
          <p>
            게시글 번호/제목 : No.{likeCountData.boardNo} /{" "}
            {likeCountData.boardTitle}
          </p>
          <p>게시글 좋아요 수 : {likeCountData.likeCount}</p>
          <p>작성자 닉네임 : {likeCountData.memberNickname}</p>
        </section>

        <section className="statistics-section">
          <h2>가장 댓글 많은 게시글</h2>
          <p>게시판 종류 : {commentCountData.boardName}</p>
          <p>
            게시글 번호/제목 : No.{commentCountData.boardNo} /{" "}
            {commentCountData.boardTitle}
          </p>
          <p>게시글 댓글 수 : {commentCountData.commentCount}</p>
          <p>작성자 닉네임 : {commentCountData.memberNickname}</p>
        </section>
      </div>
    );
  }
}
