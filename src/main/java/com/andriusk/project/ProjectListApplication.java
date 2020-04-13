package com.andriusk.project;

import com.andriusk.project.entity.Project;
import com.andriusk.project.entity.Task;
import com.andriusk.project.enums.Priority;
import com.andriusk.project.enums.ProjectStatus;
import com.andriusk.project.enums.TaskStatus;
import com.andriusk.project.service.ProjectService;
import com.andriusk.project.service.TaskService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
@EnableJpaAuditing
public class ProjectListApplication {

	@Bean
	public CommandLineRunner projectTestData(ProjectService projectService) {
		return (args) -> {
			projectService.save(new Project("Test project 1", "A test project", ProjectStatus.DONE));
			projectService.save(new Project("Test project 2", "Another test project", ProjectStatus.IN_PROGRESS));
		};
	}

	@Bean
	public CommandLineRunner taskTestData(TaskService taskService) {
		return (args) -> {
			try {
				taskService.createTask(new Task("A dummy task", "This is a dummy task intended for testing", TaskStatus.IN_PROGRESS, Priority.MEDIUM), 1L);
				taskService.createTask(new Task("Another dummy task", "This is a dummy task intended for testing", TaskStatus.COMPLETE, Priority.HIGH), 2L);
				taskService.createTask(new Task("Yet another dummy task", "This is a dummy task intended for testing as well", TaskStatus.CANCELED, Priority.HIGH), 2L);
			} catch (Exception e) {
				System.out.println(e);
			}
		};
	}

	@Bean
	public Docket swaggerDocket() {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo())
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.andriusk"))
				.build();
	}


	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title("Projectlist documentation")
				.version("0.0.1 SNAPSHOT")
				.build();
	}

	public static void main(String[] args) {
		SpringApplication.run(ProjectListApplication.class, args);
	}



}
