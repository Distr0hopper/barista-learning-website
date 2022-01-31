//package model;
//
//import com.google.inject.Inject;
//import data.Ingredient;
//import play.db.Database;
//
//import javax.inject.Singleton;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.util.ArrayList;
//import java.util.List;
//
//@Singleton
//public class FriendShipFetcher {
//    private Database db;
//
//    @Inject
//    FriendShipFetcher(Database db) {
//        this.db = db;
//    }
//
//
//    public List<UserFactory.User> getFriendshipById(int idUser) {
//        return db.withConnection(conn -> {
//            List<UserFactory.User> result = new ArrayList<>();
//            String sql = "SELECT * FROM Friendship, User WHERE idUser1 = ? AND Friendship.idUser2 = User.idUsers";
//            PreparedStatement stmt = conn.prepareStatement(sql);
//            stmt.setInt(1, idUser);
//            ResultSet rs = stmt.executeQuery();
//            while (rs.next()) {
//                UserFactory user = new UserFactory(rs, idUser);
//                result.add(user);
//            }
//            stmt.close();
//            return result;
//        });
//    }
//}
