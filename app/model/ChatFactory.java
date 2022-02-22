package model;

import com.google.inject.Inject;
import play.db.Database;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ChatFactory {
    private Database db;

    @Inject
    ChatFactory(Database db) {
        this.db = db;
    }

    /**
     * fetches all the messages one user has sent or received and returns them in a list
     * @param idUser1 the user for which the messages shall be fetched
     * @return the list of all the messages
     */
    public List<ChatFactory.Message> getAllMessages(int idUser1) {
        return db.withConnection(conn -> {
            List<ChatFactory.Message> messages = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Message WHERE (Friendship_idUser1 = ?) OR (Friendship_idUser2 = ?) ORDER BY timestamp");
            stmt.setInt(1, idUser1);
            stmt.setInt(2, idUser1);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                ChatFactory.Message message = new Message(rs);
                messages.add(message);
            }

            stmt.close();
            return messages;
        });
    }


    /**
     * adds a new Message in the database table 'Message'
     * creates a new instance of the class message
     * @param userId - the id of the user that sent the message
     * @param friendId - the id of the friend that the message shall be sent to
     * @param message - the message that shall be sent
     * @return the new instance of the class message
     */
    public Message createMessage(int userId, int friendId, String message) {
        return db.withConnection(conn -> {
            Message msg = null;
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            String sql = "INSERT INTO Message (Friendship_idUser1, Friendship_idUser2, message_text, senderId, timestamp) VALUES ((SELECT idUser1 FROM Friendship WHERE (idUser1 = ? AND idUser2 = ?) OR (idUser1 = ? AND idUser2 = ?)), (SELECT idUser2 FROM Friendship WHERE (idUser1 = ? AND idUser2 = ?) OR (idUser1 = ? AND idUser2 = ?)), ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setInt(1, userId);
            stmt.setInt(2, friendId);
            stmt.setInt(3, friendId);
            stmt.setInt(4, userId);
            stmt.setInt(5, userId);
            stmt.setInt(6, friendId);
            stmt.setInt(7, friendId);
            stmt.setInt(8, userId);
            stmt.setString(9, message);
            stmt.setInt(10, userId);
            stmt.setTimestamp(11, timestamp);
            stmt.executeUpdate();
            ResultSet rs = stmt.getGeneratedKeys();
            while (rs.next()) {
                int id = rs.getInt(1);
                msg = new Message(id, userId, friendId, message, userId);
            }

            stmt.close();
            return msg;
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


        private Message(int id, int idUser1, int idUser2, String text, int senderId) {
            this.id = id;
            this.idUser1 = idUser1;
            this.idUser2 = idUser2;
            this.senderId = senderId;
            this.text = text;
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
