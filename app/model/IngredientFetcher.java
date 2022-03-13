package model;

import com.google.inject.Inject;
import data.Ingredient;
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

/**
 * Gets the ingredient by ID from the database
 * */
    public Ingredient getIngredientById(int id) {
        return db.withConnection(conn -> {
            Ingredient ingredient = null;
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Ingredients WHERE idIngredients = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                ingredient = new Ingredient(rs);
            }
            stmt.close();
            return ingredient;
        });
    }
    public Ingredient getIngredientById(String id) {
        return getIngredientById(Integer.parseInt(id));
    }

/**
 * Gets all Ingredients from the database
 * */
    public List<Ingredient> getAllIngredients() {
        return db.withConnection(conn -> {
            List<Ingredient> ingredients = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Ingredients");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Ingredient ingredient = new Ingredient(rs);
                ingredients.add(ingredient);
            }
            stmt.close();
            return ingredients;
        });
    }



}
