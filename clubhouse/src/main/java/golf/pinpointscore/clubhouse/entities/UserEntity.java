package golf.pinpointscore.clubhouse.entities;

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
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)  
    private int userId;
    private String userName;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private String userCountry;
    private String userCity;
    private String userCourse;
    private int userHandicap;
    
}