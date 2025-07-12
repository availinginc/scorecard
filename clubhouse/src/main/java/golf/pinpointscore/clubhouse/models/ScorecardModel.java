package golf.pinpointscore.clubhouse.models;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ScorecardModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)  
    private int userId;
    private String golfCourse;
    private int holesPlayed;
    private int totalScore;

    @Column(nullable = true)
    private int holeOneScore;
    private int holeTwoScore;
    private int holeThreeScore;
    private int holeFourScore;
    private int holeFiveScore;
    private int holeSixScore;
    private int holeSevenScore;
    private int holeEightScore;
    private int holeNineScore;
    private int holeTenScore;
    private int holeElevenScore;
    private int holeTwelveScore;
    private int holeThirteenScore;
    private int holeFourteenScore;
    private int holeFifteenScore;
    private int holeSixteenScore;
    private int holeSeventeenScore;
    private int holeEighteenScore;
    
}