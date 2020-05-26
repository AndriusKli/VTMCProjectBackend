package com.andriusk.project.misc;

import com.andriusk.project.entity.Project;
import com.andriusk.project.entity.Task;
import com.andriusk.project.enums.Priority;
import com.andriusk.project.enums.ProjectStatus;
import com.andriusk.project.enums.TaskStatus;
import com.andriusk.project.repository.ProjectRepository;
import com.andriusk.project.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class SampleDataGenerator {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    private Random random = new Random();

    public SampleDataGenerator() {
    }

    private ProjectStatus randomProjectStatus() {
        return Arrays.asList(ProjectStatus.values()).get(random.nextInt(ProjectStatus.values().length));
    }

    private TaskStatus randomTaskStatus() {
        return Arrays.asList(TaskStatus.values()).get(random.nextInt(TaskStatus.values().length));
    }

    private Priority randomPriority() {
        return Arrays.asList(Priority.values()).get(random.nextInt(Priority.values().length));
    }

    private List<Task> generateTasks() {
        int amountOfTasks = random.nextInt(35);
        List<Task> tasks = new ArrayList<>();
        for (int i = 0; i < amountOfTasks; i++) {
            tasks.add(new Task(
                    "A sample task",
                    "A sample description",
                    randomTaskStatus(),
                    randomPriority(),
                    LocalDateTime.now().plusDays(1),
                    "A sample story"));
        }
        return tasks;
    }

    public void generateDbEntries() {
        for (int i = 0; i < 50; i++) {
            Project newProject = new Project(
                    "A sample project",
                    "A sample description",
                    "Andrius",
                    randomProjectStatus(),
                    LocalDateTime.now().plusDays(1)
                    );
            List<Task> generatedTasks = generateTasks();
            newProject.setTasks(generatedTasks);
            generatedTasks.forEach(task -> task.setProject(newProject));
            projectRepository.save(newProject);
            taskRepository.saveAll(generatedTasks);
        }
    }
}
