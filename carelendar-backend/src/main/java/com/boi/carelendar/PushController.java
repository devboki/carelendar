package com.boi.carelendar;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/push")
public class PushController {

    private final FcmPushService fcmPushService;

    public PushController(FcmPushService fcmPushService) {
        this.fcmPushService = fcmPushService;
    }

    @PostMapping("/send")
    public String sendPush(@RequestParam String token,
                           @RequestParam String title,
                           @RequestParam String body) throws Exception {
        return fcmPushService.sendMessageToToken(token, title, body);
    }
}
