package com.andriusk.project.logging;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.java.Log;
@Log
@Aspect
@Component
public class Logging {

    @Around(value = "execution(* com.andriusk.project.*.*.*(..) )")
    public Object logAroundMethods(ProceedingJoinPoint joinPoint) throws Throwable {

	String className = joinPoint.getTarget().getClass().toString();
	String methodName = joinPoint.getSignature().getName();

	log.info("---> [" + className + " : " + methodName + "] : Entering Method Execution");
	try {
	    Object object = joinPoint.proceed();
	    return object;
	} finally {
	    log.info("<--- [" + className + " : " + methodName + "] : Exiting Method Execution");
	}

    }

}