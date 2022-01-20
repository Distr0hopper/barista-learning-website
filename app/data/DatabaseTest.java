package data;

import play.db.Database;

import javax.inject.Inject;
import java.sql.*;

public class DatabaseTest {
    @Inject
    Database db;

    public void printCoffeeNames() {
        db.withConnection(con -> {
            PreparedStatement stmt = con.prepareStatement("SELECT * FROM Coffees");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                String coffeeTitle = rs.getString("title");
                System.out.println("CoffeeTitle = " + coffeeTitle);
            }
            rs.close();
            stmt.close();
        });
    }

}
