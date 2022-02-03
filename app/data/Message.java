package data;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class Message {
        private int id;
        private int idUser1;
        private int idUser2;
        private int senderId;
        private String text;

        public Message(ResultSet rs) throws SQLException {
            this.id = rs.getInt("idMessage");
            this.idUser1 = rs.getInt("Friendship_idUser1");
            this.idUser2 = rs.getInt("Friendship_idUser2");
            this.senderId = rs.getInt("senderId");
            this.text = rs.getString("message_text");
        }


        private Message(int id, int idUser1, int idUser2, int senderId, String text) {
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

}
