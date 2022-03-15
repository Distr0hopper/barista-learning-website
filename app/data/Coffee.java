package data;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

/**
 * Coffee Class that is used to create, retrieve or save changes to the database
 * Coffee now includes not only the Database values but also a List calls IngredientList
 * that ist filled by getIngredientsById depending on which coffee you are trying to get the Ingredientnames for
 * */
public class Coffee {
        private int id;
        private String title;
        private String description;
        private float price;
        private String coffeeImgPath;
        private String[] ingredientList;

        public Coffee(ResultSet rs) throws SQLException {
            this.id = rs.getInt("idCoffees");
            this.title = rs.getString("title");
            this.description = rs.getString("description");
            this.price = rs.getFloat("price");
            this.coffeeImgPath = rs.getString("coffeeImgPath");
            String ingredientList1 = rs.getString("ingredientList");
            this.ingredientList = ingredientList1.split(",");
        }


        private Coffee(int id, String title, String description, int ingredientID, float price, String coffeeImgPath) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.price = price;
            this.coffeeImgPath = coffeeImgPath;
        }
        public void setId(int id) {
            this.id = id;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public void setPrice(float price) {
            this.price = price;
        }

        public void setCoffeeImgPath(String coffeeImgPath) {
            this.coffeeImgPath = coffeeImgPath;
        }

        public int getId() {
            return id;
        }

        public String getTitle() {
            return title;
        }

        public String getDescription() {
            return description;
        }

        public float getPrice() {
            return price;
        }

        public String getCoffeeImgPath() {
            return coffeeImgPath;
        }

        public String[] getIngredientList() {
            return ingredientList;
        }
}
