package com.andriusk.project.service;

import com.andriusk.project.entity.Task;
import com.andriusk.project.response.TaskCreateObject;

import java.util.List;

public interface TaskService {
    void createTask(Task task, Long projectId);

    List<Task> getAllTasks(Long projectId);

    Task getTask(Long taskId);

    void deleteTaskById(Long taskId);

    void editTask(Long projectID, TaskCreateObject task);

    List<Task> findByTaskName(String searchTerm);

    void createTask(Long projectId, TaskCreateObject task);

    void exportAllTaskstoCSV();

//    TaskProgress retrieveProgress(Long projectId);
}
