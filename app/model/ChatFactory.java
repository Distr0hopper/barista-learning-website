package model;

import com.google.inject.Inject;
import play.db.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ChatFactory {
    private Database db;

    @Inject
    ChatFactory(Database db) {
        this.db = db;
    }

    public List<ChatFactory.Message> getAllMessages(int idUser1, int idUser2) {
        return db.withConnection(conn -> {
            List<ChatFactory.Message> messages = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Message WHERE Friendship_idUser1 = ? AND Friendship_idUser2 = ?");
            stmt.setInt(1, idUser1);
            stmt.setInt(2, idUser2);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                ChatFactory.Message message = new Message(rs);
                messages.add(message);
            }
            stmt.close();
            return messages;
        });
    }

    public ChatFactory.Message createMessage(int idUser1, int idUser2, Timestamp timestamp, String text, int senderId){
        return db.withConnection(conn -> {
            ChatFactory.Message message = null;
            String sql = "INSERT INTO Message (Friendship_idUser1, Friendship_idUser2, timestamp, message_text, senderId) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(2, idUser1);
            stmt.setInt(3, idUser2);
            stmt.setTimestamp(4, timestamp);
            stmt.setString(5, text);
            stmt.setInt(6, senderId);
            stmt.executeUpdate();
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                int messageId = rs.getInt(1);
                message = new Message(messageId, idUser1, idUser2, timestamp, text, senderId);
            }
            stmt.close();
            return message;
        });
    }


    public class Message {
        private int id;
        private int idUser1;
        private int idUser2;
        private int senderId;
        private String text;
        private Timestamp timestamp;

        public Message(ResultSet rs) throws SQLException {
            this.id = rs.getInt("idMessage");
            this.idUser1 = rs.getInt("Friendship_idUser1");
            this.idUser2 = rs.getInt("Friendship_idUser2");
            this.senderId = rs.getInt("senderId");
            this.text = rs.getString("message_text");
            this.timestamp = rs.getTimestamp("timestamp");
        }


        private Message(int id, int idUser1, int idUser2, Timestamp timestamp, String text, int senderId) {
            this.id = id;
            this.idUser1 = idUser1;
            this.idUser2 = idUser2;
            this.senderId = senderId;
            this.text = text;
            this.timestamp = timestamp;
        }
        public void setId(int id) {
            this.id = id;
        }

        public void setIdUser1(int id) {
            this.idUser1 = id;
        }

        public void setIdUser2(int id) {
            this.idUser2 = id;
        }

        public void setSenderId(int id) {this.senderId = senderId;}

        public void setText(String text) {this.text = text;}

        public void setTimestamp(Timestamp timestamp) {this.timestamp = timestamp;}

        public int getId() {
            return id;
        }

        public int getIdUser1() {
            return idUser1;
        }

        public int getIdUser2() {
            return idUser2;
        }

        public int getSenderId() {
            return senderId;
        }

        public String getText() {return text;}

        public Timestamp getTimestamp() {return timestamp;}
    }



}
