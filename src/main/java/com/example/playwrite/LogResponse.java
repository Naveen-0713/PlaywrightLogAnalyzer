package com.example.playwrite;

public class LogResponse {
    private String failureType;
    private String rootCause;
    private String suggestedFix;
    private String retryRecommendation;

    public LogResponse(String failureType, String rootCause, String suggestedFix, String retryRecommendation) {
        this.failureType = failureType;
        this.rootCause = rootCause;
        this.suggestedFix = suggestedFix;
        this.retryRecommendation = retryRecommendation;
    }

    public String getFailureType() {
        return failureType;
    }

    public String getRootCause() {
        return rootCause;
    }

    public String getSuggestedFix() {
        return suggestedFix;
    }

    public String getRetryRecommendation() {
        return retryRecommendation;
    }
    
}
