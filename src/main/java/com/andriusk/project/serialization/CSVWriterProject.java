package com.andriusk.project.serialization;

import com.andriusk.project.misc.FullProjectInfo;
import com.opencsv.CSVWriter;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class CSVWriterProject {

    public static String openCSVWriter(List<FullProjectInfo> projects) throws IOException {

        StringWriter file = new StringWriter();

        List<String[]> data = toStringArrayProject(projects);

        try (CSVWriter writer = new CSVWriter(file, '|', CSVWriter.NO_QUOTE_CHARACTER,
                CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END)) {
            writer.writeAll(data);
            return file.toString();
        }
    }

    private static List<String[]> toStringArrayProject(List<FullProjectInfo> projects) {

        List<String[]> records = new ArrayList<String[]>();

        records.add(new String[]{
                "Project Name",
                "Project Description",
                "Project Status",
                "Task Count",
                "Task Not Complete"});

        Iterator<FullProjectInfo> it = projects.iterator();
        while (it.hasNext()) {

            FullProjectInfo project = it.next();

            records.add(new String[]{
                    project.getProjectName(),
                    project.getProjectDescription(),
                    project.getProjectStatus(),
                    project.getTotalTasks().intValue() + "",
                    (project.getTotalTasks().intValue() - project.getCompleteTasks().intValue()) + ""});
        }
        return records;
    }

}
