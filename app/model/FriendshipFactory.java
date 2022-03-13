package model;

import com.google.inject.Inject;
import play.db.Database;

import java.sql.*;

public class FriendshipFactory {
    private static Database db;

    @Inject
    public FriendshipFactory(Database db) {
        this.db = db;
    }

    /**
     * creates a new friendship between two users in the database
     * @param userId id of one of the users
     * @param friendId id of the other user
     */
    public void createFriendship(int userId, int friendId){
        db.withConnection(conn -> {
            String sql = "INSERT INTO Friendship (idUser1, idUser2) VALUES (?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, userId);
            stmt.setInt(2, friendId);
            stmt.executeUpdate();
            stmt.close();
        });
    }

    /**
     * deletes all of the messages shared by two users from the database
     * @param userId id of one of the users
     * @param friendId id of the other user
     */
    public void deleteMessages(int userId, int friendId){
        db.withConnection(conn -> {
            String sql = "DELETE FROM Message WHERE ((Friendship_idUser1 = ? AND Friendship_idUser2 = ?) OR (Friendship_idUser1 = ? AND Friendship_idUser2 = ?))";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, userId);
            stmt.setInt(2, friendId);
            stmt.setInt(3, friendId);
            stmt.setInt(4, userId);
            stmt.executeUpdate();
            stmt.close();
        });
    }

    /**
     * deletes a friendship between two users from the database
     * @param userId id of one of the users
     * @param friendId if of the other user
     */
    public void deleteFriendship(int userId, int friendId){
        db.withConnection(conn -> {
            String sql = "DELETE FROM Friendship WHERE ((idUser1 = ? AND idUser2 = ?) OR (idUser1 = ? AND idUser2 = ?))";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, userId);
            stmt.setInt(2, friendId);
            stmt.setInt(3, friendId);
            stmt.setInt(4, userId);
            stmt.executeUpdate();
            stmt.close();
        });
    }
}
