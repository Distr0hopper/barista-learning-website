package model;

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
            String sql = "INSERT INTO User (username, mail, password, points) VALUES (?, ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, username);
            stmt.setString(2, email);
            stmt.setString(3, password);
            stmt.setInt(4, 0);
            stmt.executeUpdate();
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                int id = rs.getInt(1);
                user = new User(id, username, email, 0, 1);
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
                userNames.add(user.username);
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

    public class User {
        private int id;
        private String username;
        private String mail;
        //private String password;
        private int points;
        private Date timestamp;
        private String reward;
        private int rewardId;
        private String profilePic;

        private User(int id, String username, String mail, int points, int rewardId) {
            this.id = id;
            this.username = username;
            this.mail = mail;
            this.points = points;
            this.timestamp = timestamp;
            this.rewardId = rewardId;
        }

        private User(ResultSet rs) throws SQLException {
            this.id = rs.getInt("IdUsers");
            this.username = rs.getString("username");
            this.mail = rs.getString("mail");
            this.points = rs.getInt("points");
            this.timestamp = rs.getDate("timestamp");
            this.reward = rs.getString("rewardString");
            this.rewardId = rs.getInt("Rewards_idRewards");
            this.profilePic = rs.getString("profile_pic");
        }



        /**
         * Updates the user if it already exists and creates it otherwise. Assumes an
         * autoincrement id column.
         */
        public void save() {
            db.withConnection(conn -> {
                String sql = "UPDATE User SET username = ?, mail = ?, points = ?, Rewards_idRewards = ? WHERE idUsers = ?";
                PreparedStatement stmt = conn.prepareStatement(sql);
                stmt.setString(1, this.username);
                stmt.setString(2, this.mail);
                stmt.setInt(3, this.points);
                stmt.setInt(4,this.rewardId);
                stmt.setInt(5, this.id);
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
         * @param source - the new source of the profile pic
         */
        public void updateProfilePic(String source){
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
         * @param name - the new username that shall be stored in the database
         */
        public void updateName(String name){
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

//        public List<User> getFriends() {
//            return db.withConnection(conn -> {
//                List<User> result = new ArrayList<>();
//                String sql = "SELECT * FROM Friendship, User WHERE idUser1 = ? AND Friendship.idUser2 = User.idUsers";
//                PreparedStatement stmt = conn.prepareStatement(sql);
//                stmt.setInt(1, this.id);
//                ResultSet rs = stmt.executeQuery();
//                while (rs.next()) {
//                    User user = new User(rs);
//                    result.add(user);
//                }
//                stmt.close();
//                return result;
//            });
//        }

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

        public void addPoints(int points) {
            this.points += points;
            this.save();
        }

        public Date getTimestamp() {
            return timestamp;
        }

        public String getReward(){
            return reward;
        }

        public void setReward(int idReward){
            this.rewardId = idReward;
        }

        public int getRewardId(){
            return rewardId;
        }
        public String getProfilePic(){
            return this.profilePic;
        }

        public void setProfilePic(String source) {this.profilePic = source;}


    }

}
