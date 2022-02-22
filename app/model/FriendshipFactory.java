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

    public Friendship createFriendship(int id1, int id2){
        return db.withConnection(conn -> {
            String sql = "INSERT INTO Friendship (idUser1, idUser2) VALUES (?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, id1);
            stmt.setInt(2, id2);
            stmt.executeUpdate();
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                FriendshipFactory.Friendship friendship = new Friendship(id1, id2);
            }
            stmt.close();
            return null;
        });
    }

    public void deleteMessages(int userId, int friendId){
        db.withConnection(conn -> {
            String sql = "DELETE FROM Message WHERE ((Friendship_idUser1 = ? AND Friendship_idUser2 = ?) OR (Friendship_idUser1 = ? AND Friendship_idUser2 = ?))";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, userId);
            stmt.setInt(2, friendId);
            stmt.setInt(3, friendId);
            stmt.setInt(4, userId);
            stmt.executeUpdate();
        });
    }

    public void deleteFriendship(int userId, int friendId){
        db.withConnection(conn -> {
            String sql = "DELETE FROM Friendship WHERE ((idUser1 = ? AND idUser2 = ?) OR (idUser1 = ? AND idUser2 = ?))";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, userId);
            stmt.setInt(2, friendId);
            stmt.setInt(3, friendId);
            stmt.setInt(4, userId);
            stmt.executeUpdate();
        });
    }


public class Friendship{
        private int idUser1;
        private int idUser2;


    private Friendship(int id1, int id2) {
        this.idUser1 = id1;
        this.idUser2 = id2;
    }

    private Friendship(ResultSet rs) throws SQLException {
        this.idUser1 = rs.getInt("idUser1");
        this.idUser2 = rs.getInt("idUser2");
}



}}
