package com.andriusk.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
@EnableJpaAuditing
@EnableAutoConfiguration
public class ProjectListApplication {

    @Bean
    public Docket swaggerDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.andriusk"))
                .build();
    }

    @Bean
    public WebMvcConfigurer forwardToIndex() {
        return new WebMvcConfigurer() {
            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
                registry.addViewController("/{spring:\\w+}")
                        .setViewName("forward:/");
                registry.addViewController("/**/{spring:\\w+}")
                        .setViewName("forward:/");
                registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
                        .setViewName("forward:/");
            }
        };
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Projectlist documentation")
                .version("0.0.1 SNAPSHOT")
                .build();
    }

//	 Only for testing purposes.
//   DO NOT uncomment unless you want +200 projects and thousands of tasks.
//	@Bean
//	public CommandLineRunner projectTestData(SampleDataGenerator sampleDataGenerator) {
//		return (args) -> {
//			sampleDataGenerator.generateDbEntries();
//		};
//	}

    public static void main(String[] args) {
        SpringApplication.run(ProjectListApplication.class, args);
    }


}
