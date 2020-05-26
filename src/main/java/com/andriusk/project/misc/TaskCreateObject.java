package com.andriusk.project.misc;

import lombok.Data;

@Data
public class TaskCreateObject {
    private String taskName;
    private String taskDescription;
    private String taskPriority;
    private String TaskStatus;
    private String taskDeadline;
    private String taskStory;

}
