package com.example.playwrite;
import java.util.Map;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
@RestController
@CrossOrigin("*")

public class LogController {
      
    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @PostMapping("/analyze")
    public Map<String, GroupedErrorResponse> analyze(@RequestParam("file") MultipartFile file)
            throws Exception {

        String logContent = new String(file.getBytes());

        return logService.analyze(logContent);
    }
}
