package golf.pinpointscore.clubhouse.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import golf.pinpointscore.clubhouse.entities.UserEntity;
import golf.pinpointscore.clubhouse.repositories.UserRepository;

public class UserController {

    private final UserRepository repository;

    UserController(UserRepository repository) {
        this.repository = repository;
    }

    // Get a user by id
    @GetMapping("/users/{id}")
    UserEntity getUserById(@PathVariable Long id) {

        return repository.findById(id).orElse(null);

    }

    // Create a new user
    @PostMapping("/users")
    UserEntity newUser(@RequestBody UserEntity newUser) {

        return repository.save(newUser);

    }

    // Update an existing user
    @PatchMapping("/users/{id}")
    UserEntity updateUser(@RequestBody UserEntity newUser, @PathVariable Long id) {

        return repository.findById(id)
        .map(user -> {

            updateUserFields(user, newUser);

            return repository.save(user);

        })
        .orElseGet(() -> repository.save(newUser));

    }

    // Helper method to update user fields
    private void updateUserFields(UserEntity user, UserEntity newUser) {
        if(newUser.getUserName() != null) {
            user.setUserName(newUser.getUserName());
        }
        if(newUser.getUserFirstName() != null) {
            user.setUserFirstName(newUser.getUserFirstName());
        }
        if(newUser.getUserLastName() != null) {
            user.setUserLastName(newUser.getUserLastName());
        }
        if(newUser.getUserEmail() != null) {
            user.setUserEmail(newUser.getUserEmail());
        }
        if(newUser.getUserCountry() != null) {
            user.setUserCountry(newUser.getUserCountry());
        }
        if(newUser.getUserCity() != null) {
            user.setUserCity(newUser.getUserCity());
        }
        if(newUser.getUserCourse() != null) {
            user.setUserCourse(newUser.getUserCourse());
        }
        if(newUser.getUserHandicap() != null) {
            user.setUserHandicap(newUser.getUserHandicap());
        }
    }
    
}
