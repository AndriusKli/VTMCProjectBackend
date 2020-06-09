package com.andriusk.project.serialization;

import com.andriusk.project.entity.Task;
import com.opencsv.CSVWriter;

import java.io.IOException;
import java.io.StringWriter;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class CSVWriterTask {

    public static String openCSVWriterTasks(List<Task> tasks) throws IOException {

        StringWriter file = new StringWriter();

        List<String[]> data = toStringArrayTasks(tasks);

        try (CSVWriter writer = new CSVWriter(file, '|', CSVWriter.NO_QUOTE_CHARACTER,
                CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END)) {

            writer.writeAll(data);
            return file.toString();
        }
    }

    private static List<String[]> toStringArrayTasks(List<Task> tasks) {

        List<String[]> records = new ArrayList<String[]>();

        records.add(new String[]{
                "Task ID",
                "Task Name",
                "Task Description",
                "Task Priority",
                "Task Status",
                "Task Created On",
                "Task Modified On"});

        Iterator<Task> taskList = tasks.iterator();

        while (taskList.hasNext()) {

            Task task = taskList.next();
            records.add(new String[]{
                    task.getTaskId().intValue() + "",
                    task.getTaskName(),
                    task.getTaskDescription().replace("\n", " "),
                    task.getTaskPriority().toString(),
                    task.getTaskStatus().toString(),
                    task.getTaskCreatedOn().format(DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm")),
                    task.getTaskModifiedOn().format(DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm"))});
        }
        return records;
    }

}