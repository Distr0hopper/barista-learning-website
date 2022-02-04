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
