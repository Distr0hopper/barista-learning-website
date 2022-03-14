package data;

import play.db.Database;

import javax.inject.Inject;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *  User Class that is used to create, retrieve or save changes to the database
 */
public class User {
    private int id;
    private String username;
    private String mail;
    private int points;
    private Date timestamp;
    private String reward;
    private int rewardId;
    private int level;
    private String profilePic;

    public User(int id, String username, String mail, int points, int rewardId, int level) {
        this.id = id;
        this.username = username;
        this.mail = mail;
        this.points = points;
        this.timestamp = timestamp;
        this.rewardId = rewardId;
        this.level = level;
    }

    public User(ResultSet rs) throws SQLException {
        this.id = rs.getInt("IdUsers");
        this.username = rs.getString("username");
        this.mail = rs.getString("mail");
        this.points = rs.getInt("points");
        this.timestamp = rs.getDate("timestamp");
        this.reward = rs.getString("rewardString");
        this.rewardId = rs.getInt("Rewards_idRewards");
        this.level = rs.getInt("gamelevel");
        this.profilePic = rs.getString("profile_pic");
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }



    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public int getRanking() {
        return rewardId;
    }


    public void addPoints(int points) {
        this.points += points;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getReward() {
        return reward;
    }

    public void setReward(int idReward) {
        this.rewardId = idReward;
    }

    public int getRewardId() {
        return rewardId;
    }

    public String getProfilePic() {
        return this.profilePic;
    }

    public void setProfilePic(String source) {
        this.profilePic = source;
    }

}

