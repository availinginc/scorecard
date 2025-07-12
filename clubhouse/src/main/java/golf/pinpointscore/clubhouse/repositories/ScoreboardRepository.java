package golf.pinpointscore.clubhouse.repositories;

import org.springframework.data.repository.CrudRepository;

import golf.pinpointscore.clubhouse.models.ScoreboardModel;

public interface ScoreboardRepository extends CrudRepository<ScoreboardModel, Long> {

}