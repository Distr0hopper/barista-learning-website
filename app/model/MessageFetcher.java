package model;

import com.google.inject.Inject;
import data.Ingredient;
import data.Message;
import play.db.Database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class MessageFetcher {
    private Database db;

    @Inject
    MessageFetcher(Database db) {
        this.db = db;
    }

    public List<Message> getAllMessages(int idUser1, int idUser2) {
        return db.withConnection(conn -> {
            List<Message> messages = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Message WHERE Friendship_idUser1 = ? AND Friendship_idUser2 = ?");
            stmt.setInt(1, idUser1);
            stmt.setInt(2, idUser2);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Message message = new Message(rs);
                messages.add(message);
            }
            stmt.close();
            return messages;
        });
    }



}
