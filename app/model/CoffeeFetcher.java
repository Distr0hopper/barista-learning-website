package model;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import data.Coffee;
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

    public Coffee getCoffeeById(int id) {
        return db.withConnection(conn -> {
            Coffee coffee = null;
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Coffees WHERE idCoffees = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                List<Ingredient> ingredientList = getIngredientsByID(rs.getString("title"));
                coffee = new Coffee(rs, ingredientList);
            }
            stmt.close();
            return coffee;
        });
    }

    public Coffee getCoffeeById(String id) {
        return getCoffeeById(Integer.parseInt(id));
    }


    public List<Coffee> getAllCoffees() {
        return db.withConnection(conn -> {
            List<Coffee> coffees = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Coffees");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                System.out.println(rs.getString("title"));
                List<Ingredient> ingredientList = getIngredientsByID(rs.getString("title"));
                System.out.println(ingredientList);
                Coffee coffee = new Coffee(rs, ingredientList);
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

}


