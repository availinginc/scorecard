package golf.pinpointscore.clubhouse.models;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class UserModel {

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
    private String userHandicap;
    
}