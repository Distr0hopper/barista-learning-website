package model;

import data.Coffee;
import data.User;
import play.db.Database;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class UserFactory {

    private static Database db;

    @Inject
    public UserFactory(Database db) {
        this.db = db;
    }


    /**
     * Authenticates a user with the given credentials
     *
     * @param username username from user input
     * @param password password from user input
     * @return Found user or null if user not found
     */

    public User authenticate(String username, String password) {
        return db.withConnection(conn -> {
            User user = null;
            PreparedStatement stmt = conn.prepareStatement("SELECT User.*, Rewards.reward AS rewardString FROM User,Rewards WHERE User.Rewards_idRewards = Rewards.idRewards AND username = ? AND password = ?");
            stmt.setString(1, username);
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                user = new User(rs);
            }
            System.out.println(user);
            stmt.close();
            return user;
        });
    }

    /**
     * creates a new User in the database with the given username, email and password
     * @param username
     * @param email
     * @param password
     * @return
     */
    public User create(String username, String email, String password) {
        return db.withConnection(conn -> {
            User user = null;
            String sql = "INSERT INTO User (username, mail, password, points, gamelevel) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, username);
            stmt.setString(2, email);
            stmt.setString(3, password);
            stmt.setInt(4, 0);
            stmt.setInt(5, 1);
            stmt.executeUpdate();
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                int id = rs.getInt(1);
                user = new User(id, username, email, 0, 1, 1);
            }
            stmt.close();
            return user;
        });
    }

    /**
     * updates the username in the database
     * @param name - the new username that shall be stored in the database
     */
    public void updateName(String name, int id) {
        db.withConnection((conn -> {
            String sql = "UPDATE User SET username = ? WHERE idUsers = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, name);
            stmt.setInt(2, id);
            stmt.executeUpdate();
            stmt.close();
        }));
    }
    /**
     * updates the profile pic source in the database
     *
     * @param source - the new source of the profile pic
     */
    public void updateProfilePic(String source, int id) {
        db.withConnection(conn -> {
            String sql = "UPDATE User SET profile_pic = ? WHERE idUsers = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, source);
            stmt.setInt(2, id);
            stmt.executeUpdate();
            stmt.close();
        });
    }
    /**
     * Updates the user if it already exists and creates it otherwise. Assumes an
     * autoincrement id column.
     */
    public void save(User user) {
        db.withConnection(conn -> {
            String sql = "UPDATE User SET username = ?, mail = ?, points = ?, Rewards_idRewards = ?, gamelevel = ? WHERE idUsers = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getMail());
            stmt.setInt(3, user.getPoints());
            stmt.setInt(4, user.getRewardId());
            stmt.setInt(5, user.getLevel());
            stmt.setInt(6, user.getId());
            stmt.executeUpdate();
            stmt.close();
        });
    }
    /**
     * Delete the user from the database
     */
    public void delete(int id) {
        db.withConnection(conn -> {
            String sql = "DELETE FROM User WHERE idUsers = ?";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, id);
            stmt.executeUpdate();
            stmt.close();
        });
    }


    /**
     * Retrieves a user from database with given ID
     *
     * @param id id of user to find
     * @return User if found, else null
     */

    public User getUserById(int id) {
        return db.withConnection(conn -> {
            User user = null;
            PreparedStatement stmt = conn.prepareStatement("SELECT User.*, Rewards.reward AS rewardString FROM User, Rewards WHERE User.Rewards_idRewards = Rewards.idRewards AND idUsers = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                user = new User(rs);
            }
            stmt.close();
            return user;
        });
    }

    /**
     * gets the User via its username
     * @param username
     * @return
     */
    public User getUserByUsername(String username) {
        return db.withConnection(conn -> {
            User user = null;
            PreparedStatement stmt = conn.prepareStatement("SELECT User.*, Rewards.reward AS rewardString FROM User, Rewards WHERE User.Rewards_idRewards = Rewards.idRewards AND username = ?");
            stmt.setString(1, username);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                user = new User(rs);
            }
            stmt.close();
            return user;
        });
    }

    /**
     * Polymorphism method for getUserById(int)
     * @param id String of id
     * @return User if found, else null
     */
    public User getUserById(String id) {
        return getUserById(Integer.parseInt(id));
    }

    /**
     * gets all the users from the database
     * @return List of Users
     */
    public List<User> getAllUsers() {
        return db.withConnection(conn -> {
            List<User> users = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT User.*, Rewards.reward AS rewardString FROM User, Rewards WHERE User.Rewards_idRewards = Rewards.idRewards");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                User user = new User(rs);
                users.add(user);
            }
            stmt.close();
            return users;
        });
    }

    /**
     * fetches all the usernames for all the users from the database
     * @return List of username Strings
     */
    public List<String> getAllUsernames() {
        return db.withConnection(conn -> {
            List<String> userNames = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT User.*, Rewards.reward AS rewardString FROM User, Rewards WHERE User.Rewards_idRewards = Rewards.idRewards");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                User user = new User(rs);
                userNames.add(user.getUsername());
            }
            stmt.close();
            return userNames;
        });
    }

    /**
     * gets all the Users by the descending order of their points
     * @return a List of Users sorted by their points descending
     */
    public List<User> getAllUsersDesc() {
        return db.withConnection(conn -> {
            List<User> users = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT User.*, Rewards.reward AS rewardString FROM User, Rewards WHERE User.Rewards_idRewards = Rewards.idRewards ORDER BY points DESC");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                User user = new User(rs);
                users.add(user);
            }
            stmt.close();
            return users;
        });
    }

    /**
     * gets the Friends for the user given as a parameter into the method from the database
     * @param idUser1
     * @return List of Friends for user with id idUser1
     */
    public List<User> getFriendsById(int idUser1) {
        return db.withConnection(conn -> {
            List<User> friendList = new ArrayList<>();
            String sql = "SELECT Friendship.*, User.*, Rewards.reward AS rewardString FROM Friendship, User, Rewards WHERE (User.Rewards_idRewards = Rewards.idRewards) AND ((idUser1 = ? AND Friendship.idUser2 = User.idUsers) OR (idUser1 = User.idUsers AND Friendship.idUser2 = ?))";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, idUser1);
            stmt.setInt(2, idUser1);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                User user = new User(rs);
                friendList.add(user);
            }
            stmt.close();
            return friendList;
        });
    }

}
