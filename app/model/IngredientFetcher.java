package model;

import com.google.inject.Inject;
import play.db.Database;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class IngredientFetcher {
    private Database db;

    @Inject
    IngredientFetcher(Database db) {
        this.db = db;
    }


    public Ingredient getIngredientById(int id) {
        return db.withConnection(conn -> {
            IngredientFetcher.Ingredient ingredient = null;
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM User WHERE idIngredients = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                ingredient = new IngredientFetcher.Ingredient(rs);
            }
            stmt.close();
            return ingredient;
        });
    }
    public IngredientFetcher.Ingredient getIngredientById(String id) {
        return getIngredientById(Integer.parseInt(id));
    }


    public List<IngredientFetcher.Ingredient> getAllIngredients() {
        return db.withConnection(conn -> {
            List<IngredientFetcher.Ingredient> ingredients = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Ingredients");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                IngredientFetcher.Ingredient ingredient = new IngredientFetcher.Ingredient(rs);
                ingredients.add(ingredient);
            }
            stmt.close();
            return ingredients;
        });
    }

    public class Ingredient {
        private int id;
        private String name;

        private Ingredient(ResultSet rs) throws SQLException {
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

}
