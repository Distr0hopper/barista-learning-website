package model;

import com.google.inject.Inject;
import com.google.inject.Singleton;
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
                coffee = new CoffeeFetcher.Coffee(rs);
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
                CoffeeFetcher.Coffee coffee = new CoffeeFetcher.Coffee(rs);
                coffees.add(coffee);
            }
            stmt.close();
            return coffees;
        });
    }

    public class Coffee {
        private int id;
        private String title;
        private String description;
        private String ingredients;
        private float price;
        private String coffeeImgPath;

        private Coffee(ResultSet rs) throws SQLException {
            this.id = rs.getInt("idCoffees");
            this.title = rs.getString("title");
            this.description = rs.getString("description");
            this.ingredients = rs.getString("ingredients");
            this.price = rs.getFloat("price");
            this.coffeeImgPath = rs.getString("coffeeImgPath");
        }


        private Coffee(int id, String title, String description, String ingredients, float price, String coffeeImgPath) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.ingredients = ingredients;
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

        public void setIngredients(String ingredients) {
            this.ingredients = ingredients;
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

        public String getIngredients() {
            return ingredients;
        }

        public float getPrice() {
            return price;
        }

        public String getCoffeeImgPath() {
            return coffeeImgPath;
        }
    }

}


