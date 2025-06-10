package edu.kh.todo.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.todo.model.dto.Todo;

@Mapper
public interface TodoMapper {

	List<Todo> getTodoList();

	int changeTodo(Todo todo);

	int deleteTodo(int todoNo);

	int addTodo(Todo todo);


}
