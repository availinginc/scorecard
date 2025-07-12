package golf.pinpointscore.clubhouse.services;

import java.util.ArrayList;
import java.util.List;

import golf.pinpointscore.clubhouse.entities.ScorecardEntity;
import golf.pinpointscore.clubhouse.entities.UserEntity;
import golf.pinpointscore.clubhouse.models.ScoreboardModel;
import golf.pinpointscore.clubhouse.repositories.ScorecardRepository;
import golf.pinpointscore.clubhouse.repositories.UserRepository;

public class ScoreboardService {

    private final ScorecardRepository scorecardRepository;
    private final UserRepository userRepository;

    ScoreboardService(ScorecardRepository scorecardRepository, UserRepository userRepository) {
        this.scorecardRepository = scorecardRepository;
        this.userRepository = userRepository;
    }

    public List<ScoreboardModel> getScoreboard(){
        // Initialize an empty list to hold the scoreboard models
        List<ScoreboardModel> scoreboard = new ArrayList<>();

        // Fetch all scorecards from the repository
        Iterable<ScorecardEntity> scorecards = scorecardRepository.findAll();

        // Iterate through each scorecard and calculate the total score
        scorecards.forEach(scorecard -> {

            // Fetch the user associated with the scorecard
            UserEntity user = userRepository.findById((long) scorecard.getUserId()).orElse(null);

            // For each scorecard, create a ScoreboardModel entry
            int userId = scorecard.getUserId();
            String userName = user.getUserName();
            int userHandicap = user.getUserHandicap();
            String golfCourse = scorecard.getGolfCourse();
            int holesPlayed = scorecard.getHolesPlayed();
            int totalScore = scorecard.getTotalScore();

            // Calculate the total score based on the scorecard, golf course par, and user handicap
            Integer scoreboardScore = Integer.parseInt(String.valueOf(scorecard.getTotalScore()))
                - Integer.parseInt(String.valueOf(scorecard.getGolfCoursePar()))
                - Integer.parseInt(String.valueOf(user.getUserHandicap()));

            // Create a new ScoreboardModel instance with the calculated values
            ScoreboardModel scoreboardEntry = new ScoreboardModel(
                userId,
                userName,
                userHandicap,
                golfCourse,
                holesPlayed,
                totalScore,
                scoreboardScore
            );

            // Add the new scoreboard entry to the scoreboard list
            scoreboard.add(scoreboardEntry);

        });

        return scoreboard;

    }

	public List<ScoreboardModel> getScoreboardLimited(int amount) {

        return null;
        
	}

}
