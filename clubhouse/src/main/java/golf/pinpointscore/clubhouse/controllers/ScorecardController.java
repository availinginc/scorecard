package golf.pinpointscore.clubhouse.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class ScorecardController {

    @GetMapping(path="/scoreboard")
    public @ResponseBody String Scorecard() {

        return "Pinpointscore - Scoreboard";

    }
    
}
