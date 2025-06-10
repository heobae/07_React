package edu.kh.todo.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.kh.todo.model.dto.Todo;
import edu.kh.todo.model.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {
	
	private final TodoMapper mapper;
	
	@Override
	public List<Todo> getTodoList() {
	
		return mapper.getTodoList();
	}

	@Override
	public int changeTodo(Todo todo) {
		
		return mapper.changeTodo(todo);
	}

	@Override
	public int deleteTodo(int todoNo) {
		
	    return mapper.deleteTodo(todoNo);
	}

	@Override
	public int addTodo(Todo todo) {
		
		return mapper.addTodo(todo);
	}
	
	

	
	
}
