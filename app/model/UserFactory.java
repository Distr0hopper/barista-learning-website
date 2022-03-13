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
     *
     * @param id String of id
     * @return User if found, else null
     */
    public User getUserById(String id) {
        return getUserById(Integer.parseInt(id));
    }

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

    public List<User> getFriendsById(int idUser1) {
        return db.withConnection(conn -> {
            List<User> friendList = new ArrayList<>();
            //String sql = "SELECT * FROM Friendship, User WHERE (idUser1 = ? AND Friendship.idUser2 = User.idUsers) OR (idUser1 = User.idUsers AND Friendship.idUser2 = ?) ";
            String sql2 = "SELECT Friendship.*, User.*, Rewards.reward AS rewardString FROM Friendship, User, Rewards WHERE (User.Rewards_idRewards = Rewards.idRewards) AND ((idUser1 = ? AND Friendship.idUser2 = User.idUsers) OR (idUser1 = User.idUsers AND Friendship.idUser2 = ?))";
            PreparedStatement stmt = conn.prepareStatement(sql2);
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

//    public void deleteFriend(int userID1, int userID2) {
//        db.withConnection(conn -> {
//            String sql = "DELETE FROM Friendship WHERE idUser1 = ? AND idUser2 = ?;";
//            PreparedStatement stmt = conn.prepareStatement(sql);
//            stmt.setInt(1, userID1);
//            stmt.setInt(2, userID2);
//            stmt.executeUpdate();
//            stmt.close();
//        });
//    }




}
