package golf.pinpointscore.clubhouse.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class UserController {

    @GetMapping(path="/scoreboard")
    public @ResponseBody String Scorecard() {

        return "Pinpointscore - User";

    }
    
}
