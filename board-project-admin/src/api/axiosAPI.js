import axios from "axios";

export const axiosAPi = axios.create({
  baseURL: "http://localhost",
  // headers : {"Content-Type" : "application/json"} // 쓸려면 쓸 순 있다.
  // withCredentials : true // 쿠키 포함 설정 (JWT.Json Web Token 쓸 때 중요)
  // 서버에서도 클라이언트가 보낸 쿠키를 받아줄 준비 해야함!
  // credential 허용 설정 필요함
  // -> JWT 사용 시 중요한 옵션!
});
