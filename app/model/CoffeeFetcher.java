package model;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import data.Ingredient;
import play.db.Database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class CoffeeFetcher {
    private Database db;

    @Inject
    CoffeeFetcher(Database db) {
        this.db = db;
    }

    public CoffeeFetcher.Coffee getCoffeeById(int id) {
        return db.withConnection(conn -> {
            CoffeeFetcher.Coffee coffee = null;
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Coffees WHERE idCoffees = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                List<Ingredient> ingredientList = getIngredientsByID(rs.getString("title"));
                coffee = new CoffeeFetcher.Coffee(rs, ingredientList);
            }
            stmt.close();
            return coffee;
        });
    }

    public CoffeeFetcher.Coffee getCoffeeById(String id) {
        return getCoffeeById(Integer.parseInt(id));
    }


    public List<CoffeeFetcher.Coffee> getAllCoffees() {
        return db.withConnection(conn -> {
            List<CoffeeFetcher.Coffee> coffees = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Coffees");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                System.out.println(rs.getString("title"));
                List<Ingredient> ingredientList = getIngredientsByID(rs.getString("title"));
                System.out.println(ingredientList);
                CoffeeFetcher.Coffee coffee = new CoffeeFetcher.Coffee(rs, ingredientList);
                coffees.add(coffee);
            }
            stmt.close();
            return coffees;
        });
    }

    public List <Ingredient> getIngredientsByID(String coffeeID){
        return db.withConnection(conn -> {
            List<Ingredient> ingredients = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Ingredients JOIN Coffees_has_Ingredients ON idIngredients = Ingredients_idIngredients JOIN Coffees ON idCoffees = Coffees_idCoffees WHERE title = ?");
            stmt.setString(1, coffeeID);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Ingredient ingredient = new Ingredient(rs);
                System.out.println(ingredient);
                ingredients.add(ingredient);
            }
            stmt.close();
            return ingredients;
        });
    }

    public class Coffee {
        private int id;
        private String title;
        private String description;
        private int ingredientID;
        private float price;
        private String coffeeImgPath;
        private List<Ingredient> ingredientList;

        private Coffee(ResultSet rs, List <Ingredient> ingredients) throws SQLException {
            this.id = rs.getInt("idCoffees");
            this.title = rs.getString("title");
            this.description = rs.getString("description");
            this.ingredientID = rs.getInt("ingredients");
            this.price = rs.getFloat("price");
            this.coffeeImgPath = rs.getString("coffeeImgPath");
            this.ingredientList = ingredients;
        }


        private Coffee(int id, String title, String description, int ingredientID, float price, String coffeeImgPath, List<Ingredient> ingredientList) {
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

}


