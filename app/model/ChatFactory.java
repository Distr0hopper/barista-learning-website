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

    /*public ChatFactory.Message createMessage(int idUser1, int idUser2, String text, int senderId){
        return db.withConnection(conn -> {
            //ChatFactory.Message message = null;
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            String sql = "SELECT idUser1, idUser2 FROM Friendship WHERE (idUser1 = ? AND idUser2 = ?) OR (idUser1 = ? AND idUser2 = ?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, idUser1);
            stmt.setInt(2, idUser2);
            stmt.setInt(3, idUser2);
            stmt.setInt(4, idUser1);
            ResultSet rs = stmt.executeQuery();
            int id1 = rs.getInt("idUser1");
            int id2 = rs.getInt("idUser2");
            String sql2 = "INSERT INTO Message (Friendship_idUser1, Friendship_idUser2, message_text, senderId) VALUES (?, ?, ?, ?)";
            PreparedStatement stmt2 = conn.prepareStatement(sql2);
            stmt2.setInt(1, id1);
            stmt2.setInt(2, id2);
            stmt2.setString(3, text);
            stmt2.setInt(4, senderId);
            stmt2.executeUpdate();
            ResultSet rs2 = stmt2.getGeneratedKeys();
            if (rs2.next()) {
                int messageId = rs2.getInt(1);
            }
            stmt2.close();
            return null;
        });
    }*/
    public ChatFactory.Message createMessage(int userId, int friendId, String message) {
        /*try{
        return db.withConnection(conn -> {
            ChatFactory.Message msg = null;
            String sql = "INSERT INTO Message (message_text, Friendship_idUser1, Friendship_idUser2, senderId) VALUES (?, ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, message);
            stmt.setInt(2, userId);
            stmt.setInt(3, friendId);
            stmt.setInt(4, userId);
            stmt.executeUpdate();
            ResultSet rs = stmt.getGeneratedKeys();
            if (rs.next()) {
                int id = rs.getInt(1);
                msg = new ChatFactory.Message(id, userId, friendId, message, userId);
            }
            stmt.close();
            return msg;
        });
    }catch(RuntimeException runtimeException){
            return db.withConnection(conn -> {
                ChatFactory.Message msg = null;
                String sql = "INSERT INTO Message (message_text, Friendship_idUser1, Friendship_idUser2, senderId) VALUES (?, ?, ?, ?)";
                PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                stmt.setString(1, message);
                stmt.setInt(2, friendId);
                stmt.setInt(3, userId);
                stmt.setInt(4, userId);
                stmt.executeUpdate();
                ResultSet rs = stmt.getGeneratedKeys();
                if (rs.next()) {
                    int id = rs.getInt(1);
                    msg = new ChatFactory.Message(id, userId, friendId, message, userId);
                }
                stmt.close();
                return msg;
        });
    }*/return null;}


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
