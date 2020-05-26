package com.andriusk.project.misc;

import com.andriusk.project.entity.Project;
import com.andriusk.project.entity.Task;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class FullProjectInfo {

    private Long projectId;
    private String projectName;
    private String projectDescription;
    private String projectManager;
    private String projectStatus;
    private LocalDateTime projectCreatedOn;
    private LocalDateTime projectModifiedOn;
    private LocalDateTime projectDeadline;
    private Long completeTasks;
    private Long totalTasks;
    private List<Task> tasks;

    public FullProjectInfo(Project project, Long completeTasks, Long totalTasks) {
        this.projectId = project.getProjectId();
        this.projectName = project.getProjectName();
        this.projectDescription = project.getProjectDescription();
        this.projectManager = project.getProjectManager();
        this.projectCreatedOn = project.getProjectCreatedOn();
        this.projectModifiedOn = project.getProjectModifiedOn();
        this.projectDeadline = project.getProjectDeadline();
        this.completeTasks = completeTasks;
        this.totalTasks = totalTasks;
        this.tasks = project.getTasks();
        if (this.completeTasks.equals(this.totalTasks) && this.totalTasks != 0) {
            this.projectStatus = "Complete";
        } else if (this.totalTasks > 0){
            this.projectStatus = "In progress";
        } else {
            this.projectStatus = "Not started";
        }
    }
}
