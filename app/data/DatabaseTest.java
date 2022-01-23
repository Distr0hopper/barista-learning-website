package data;

import play.db.Database;

import javax.inject.Inject;
import java.sql.*;

public class DatabaseTest {
    @Inject
    Database db;
    public static void main(String[] args) {
        /*String url = "jdbc:mysql://cypher.informatik.uni-wuerzburg.de:38336/sopra-2021WS-team02?useSSL=false";
        String username = "sopra-2021WS-team02";
        String password = "wRtHm3Ya";
        try (Connection conn = DriverManager.getConnection(db.url, username, password)) {

            System.out.println("Erfolgreich mit Datenbank verbunden.");

            // Einf�gen/ Ver�ndern
            //String query = "INSERT INTO personen (vorname, nachname, geburtsdatum) VALUES ('Vin', 'Diesel', '1968-04-18')";
            //String query = "UPDATE personen SET vorname='Beate' WHERE personen_id=6";

            //Statement stmt = conn.createStatement();
            //stmt.execute(query);
            //stmt.close();


            //------------------------------------------------------------------------------------------------
            // ausgeben
            String query = "SELECT * FROM 'Ingredients' ORDER BY ingrendientID ASC";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            int columns = rs.getMetaData().getColumnCount();
            for(int i = 1; i<=columns; i++)
                System.out.print(String.format("%-15s", rs.getMetaData().getColumnLabel(i)));

            System.out.println();
            System.out.println("----------------------------------------------------------------");

            while(rs.next()) {
                for(int i = 1; i<=columns; i++)
                    System.out.print(String.format("%-15s", rs.getString(i)));
                System.out.println();
            }

            rs.close();
            stmt.close();


        }catch(SQLException ex) {
            System.err.println(ex.getMessage());
        } finally {
            if ()
        }


    }*/

    }
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
