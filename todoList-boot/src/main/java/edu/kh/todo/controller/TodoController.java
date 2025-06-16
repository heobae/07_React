package edu.kh.todo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.kh.todo.model.dto.Todo;
import edu.kh.todo.model.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin(origins="http://localhost:5173")
@RequestMapping("todo")
@Slf4j
@RequiredArgsConstructor
public class TodoController {
	
	private final TodoService service;
	
	@GetMapping("todoList")
	public ResponseEntity<Object> getTodoList() {
		try {
			List<Todo> todo = service.getTodoList();
			return ResponseEntity.status(HttpStatus.OK).body(todo);
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버처리 중 예외 발생 : " + e.getMessage());
			
		}
	}
	
	@PutMapping("todoChange")
	public ResponseEntity<String> changeTodo(@RequestBody Todo todo) {
		
		try {
			int result = service.changeTodo(todo);
			
			if(result > 0 ) {
				return ResponseEntity.status(HttpStatus.OK).body(todo.getTodoNo() + "번 완료 여부 수정");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효하지 않은 todo번호 : " + todo.getTodoNo());
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("완료 여부 수정 중 에러 발생 : " + e.getMessage());
		}
	}
	
	/** 할 일 삭제
	 * @param todoNo
	 * @return
	 */
	@DeleteMapping("todoDelete/{todoNo}")
	public ResponseEntity<String> deleteTodo(@PathVariable("todoNo") int todoNo) {
		try {
			int result = service.deleteTodo(todoNo);
			
			if(result > 0 ) {
				return ResponseEntity.status(HttpStatus.OK).body(todoNo + "번 삭제 완료");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효하지 않은 todo번호");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("todo 삭제 중 에러 발생 : " + e.getMessage());
		}
	}
	
	/** 할 일 추가
	 * @param todo
	 * @return
	 */
	@PostMapping("addTodo")
	public ResponseEntity<Object> addTodo(@RequestBody Todo todo) {
		try {
			int result = service.addTodo(todo);
			if (result > 0 ) {
				return ResponseEntity.status(HttpStatus.OK).body(todo + "번 추가 완료");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("추가 실패");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("todo 추가 중 에러 발생 : " + e.getMessage());
		}
	}
	
	
	
}
