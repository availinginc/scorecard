package golf.pinpointscore.clubhouse.entities;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
@Entity
public class ScorecardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int userId;
    private Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    private String golfCourse;
    private int golfCoursePar;
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