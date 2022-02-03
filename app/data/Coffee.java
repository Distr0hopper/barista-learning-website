package data;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Coffee now includes not only the Database values but also a List calles IngredientList
 * that ist filled by getIngredientsById depending on which coffee you are trying to get the Ingredientnames for*/
public class Coffee {
        private int id;
        private String title;
        private String description;
        private int ingredientID;
        private float price;
        private String coffeeImgPath;
        private List<Ingredient> ingredientList;

        public Coffee(ResultSet rs, List<Ingredient> ingredientList) throws SQLException {
            this.id = rs.getInt("idCoffees");
            this.title = rs.getString("title");
            this.description = rs.getString("description");
            this.ingredientID = rs.getInt("ingredients");
            this.price = rs.getFloat("price");
            this.coffeeImgPath = rs.getString("coffeeImgPath");
            this.ingredientList = ingredientList;
        }


        private Coffee(int id, String title, String description, int ingredientID, List<Ingredient> ingredientList, float price, String coffeeImgPath) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.ingredientID = ingredientID;
            this.price = price;
            this.coffeeImgPath = coffeeImgPath;
            this.ingredientList = ingredientList;
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

        public void setIngredients(int ingredientID) {
            this.ingredientID = ingredientID;
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

        public int getIngredientID() {
            return ingredientID;
        }

        public float getPrice() {
            return price;
        }

        public String getCoffeeImgPath() {
            return coffeeImgPath;
        }

        public List<Ingredient> getIngredientList() {
            return ingredientList;
        }
}
