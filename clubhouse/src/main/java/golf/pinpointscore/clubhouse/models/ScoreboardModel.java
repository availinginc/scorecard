package golf.pinpointscore.clubhouse.models;

import java.util.ArrayList;

import golf.pinpointscore.clubhouse.entities.ScorecardEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ScoreboardModel {

    private ArrayList<ScorecardEntity> scorecards;
    
}