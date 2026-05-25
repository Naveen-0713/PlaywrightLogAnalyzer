package com.example.playwrite;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class LogService {
    
    public Map<String, GroupedErrorResponse> analyze(String log) {

        Map<String, GroupedErrorResponse> result = new HashMap<>();

        // Initialize categories with fixes
        result.put("TIMEOUT_ERROR", new GroupedErrorResponse(0,
                "Increase timeout or fix selector stability"));

        result.put("LOCATOR_ERROR", new GroupedErrorResponse(0,
                "Update locator or use better selectors"));

        result.put("ASSERTION_ERROR", new GroupedErrorResponse(0,
                "Fix expected vs actual values"));

        result.put("NETWORK_ERROR", new GroupedErrorResponse(0,
                "Check API/network stability"));

        result.put("UNKNOWN_ERROR", new GroupedErrorResponse(0,
                "Manually inspect logs"));

        // Normalize log
        String lower = log.toLowerCase();

        // Split into test cases (simple simulation for 100 logs support)
        String[] cases = lower.split("test");

        for (String c : cases) {

            if (c.contains("timeout")) {
                increment(result, "TIMEOUT_ERROR");
            }
            else if (c.contains("locator")) {
                increment(result, "LOCATOR_ERROR");
            }
            else if (c.contains("assert")) {
                increment(result, "ASSERTION_ERROR");
            }
            else if (c.contains("network")) {
                increment(result, "NETWORK_ERROR");
            }
            else {
                increment(result, "UNKNOWN_ERROR");
            }
        }

        return result;
    }

    private void increment(Map<String, GroupedErrorResponse> map, String key) {

        GroupedErrorResponse current = map.get(key);

        map.put(key,
                new GroupedErrorResponse(
                        current.getCount() + 1,
                        current.getSuggestedFix()
                )
        );
    }
}
