package golf.pinpointscore.clubhouse.repositories;

import org.springframework.data.repository.CrudRepository;

import golf.pinpointscore.clubhouse.models.UserModel;

public interface UserRepository extends CrudRepository<UserModel, Long> {

}