package edu.kh.todo.model.service;

import java.util.List;

import edu.kh.todo.model.dto.Todo;

public interface TodoService {

	List<Todo> getTodoList();

	int changeTodo(Todo todo);

	int deleteTodo(int todoNo);

	int addTodo(Todo todo);

	

}
