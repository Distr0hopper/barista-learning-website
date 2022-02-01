package data;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Ingredient {
        private int id;
        private String name;

        public Ingredient(ResultSet rs) throws SQLException {
            this.id = rs.getInt("idIngredients");
            this.name = rs.getString("name");
        }


        private Ingredient(int id, String name) {
            this.id = id;
            this.name = name;
        }

        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

}
