package com.andriusk.project.serializing;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.andriusk.project.entity.Task;
import com.opencsv.CSVWriter;

public class CSVWriterTask {

    public static void openCSVWriterTasks(List<Task> tasks) {

	File file = new File("serialize/Tasks.csv");

	List<String[]> data = toStringArrayTasks(tasks);

	try {
	    FileWriter outputfile = new FileWriter(file);

	    CSVWriter writer = new CSVWriter(outputfile, ',', CSVWriter.NO_QUOTE_CHARACTER,
		    CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END);

	    writer.writeAll(data);
	    writer.close();
	} catch (IOException e) {
	    e.printStackTrace();
	}

    }

    private static List<String[]> toStringArrayTasks(List<Task> tasks) {
	
	List<String[]> records = new ArrayList<String[]>();

	records.add(new String[] { 
		"Task ID",
		"Task Name",
		"Task Description",
		"Task Priority",
		"Task Status",
		"Task Created On",
		"Task Modified On" });

	Iterator<Task> taskList = tasks.iterator();

	while (taskList.hasNext()) {

	    Task task = taskList.next();
	    records.add(new String[] {
		    task.getTaskId().intValue() + "",
		    task.getTaskName(),
		    task.getTaskDescription(),
		    task.getTaskPriority().toString(),
		    task.getTaskStatus().toString(),
		    task.getTaskCreatedOn().format(DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm")),
		    task.getTaskModifiedOn().format(DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm"))});
	}
	return records;
    }
}
