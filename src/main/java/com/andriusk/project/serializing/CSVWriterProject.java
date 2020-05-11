package com.andriusk.project.serializing;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.andriusk.project.response.FullProjectInfo;
import com.opencsv.CSVWriter;

public class CSVWriterProject {
    
    private final static String FILEPATH = "target/serialize/Project.csv";
   

    public static void openCSVWriter(List<FullProjectInfo> projects) {
	
	File file = new File(FILEPATH);

	if (!file.exists()) {
	    file.getParentFile().mkdir();
	}

	List<String[]> data = toStringArrayProject(projects);

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

    private static List<String[]> toStringArrayProject(List<FullProjectInfo> projects) {

	List<String[]> records = new ArrayList<String[]>();

	records.add(new String[] { 
		"Project Name",
		"Project Description",
		"Project Status",
		"Task Count",
		"Task Not Complete" });

	Iterator<FullProjectInfo> it = projects.iterator();
	while (it.hasNext()) {

	    FullProjectInfo project = it.next();

	    records.add(new String[] {
		    project.getProjectName(),
		    project.getProjectDescription(),
		    project.getProjectStatus(),
		    project.getTotalTasks().intValue() + "",
		    (project.getTotalTasks().intValue() - project.getCompleteTasks().intValue()) + "" });
	}
	return records;
    }
    
    public static String getFilepath() {
        return FILEPATH;
    }

}
