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
    private static Database db;

    @Inject
    public User(Database db) {
        this.db = db;
    }
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


    /**
     * Updates the user if it already exists and creates it otherwise. Assumes an
     * autoincrement id column.
     */
    public void save() {
        db.withConnection(conn -> {
            String sql = "UPDATE User SET username = ?, mail = ?, points = ?, Rewards_idRewards = ?, gamelevel = ? WHERE idUsers = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, this.username);
            stmt.setString(2, this.mail);
            stmt.setInt(3, this.points);
            stmt.setInt(4, this.rewardId);
            stmt.setInt(5, this.level);
            stmt.setInt(6, this.id);
            stmt.executeUpdate();
            stmt.close();
        });
    }

    /**
     * Delete the user from the database
     */
    public void delete() {
        db.withConnection(conn -> {
            String sql = "DELETE FROM User WHERE idUsers = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, this.id);
            stmt.executeUpdate();
            stmt.close();
        });
    }

    /**
     * updates the profile pic source in the database
     *
     * @param source - the new source of the profile pic
     */
    public void updateProfilePic(String source) {
        db.withConnection(conn -> {
            String sql = "UPDATE User SET profile_pic = ? WHERE idUsers = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, source);
            stmt.setInt(2, this.id);
            stmt.executeUpdate();
            stmt.close();
            setProfilePic(source);
        });
    }

    /**
     * updates the username in the database
     *
     * @param name - the new username that shall be stored in the database
     */
    public void updateName(String name) {
        db.withConnection((conn -> {
            String sql = "UPDATE User SET username = ? WHERE idUsers = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, name);
            stmt.setInt(2, this.id);
            stmt.executeUpdate();
            stmt.close();
            setUsername(name);
        }));
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
        this.save();
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
        this.save();
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

