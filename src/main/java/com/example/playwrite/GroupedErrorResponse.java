package com.example.playwrite;

public class GroupedErrorResponse {

    private int count;
    private String suggestedFix;

    public GroupedErrorResponse() {}

    public GroupedErrorResponse(int count, String suggestedFix) {
        this.count = count;
        this.suggestedFix = suggestedFix;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getSuggestedFix() {
        return suggestedFix;
    }

    public void setSuggestedFix(String suggestedFix) {
        this.suggestedFix = suggestedFix;
    }
}