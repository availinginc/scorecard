package golf.pinpointscore.clubhouse.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ScoreboardModel {

    private int userId;
    private String userName;
    private int userHandicap;
    private String golfCourse;
    private int holesPlayed;
    private int totalScore;
    private int scoreboardScore;

}