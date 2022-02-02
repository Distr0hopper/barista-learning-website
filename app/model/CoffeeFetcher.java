package model;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import data.Coffee;
import data.Ingredient;
import play.db.Database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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

/**
 * getallCoffees() retrieves all Coffees and sets Values for ingredientList by calling getIngredientsByID with title as id Value
 * Coffee has two parameters now therefore, one being the ResultSet and one being ingredientlist
 * Ingredientlist is added like this into the Coffee Class and the entire new Coffee is built and returned*/
String sql = "SELECT * FROM Friendship, User WHERE idUser1 = ? AND Friendship.idUser2 = User.idUsers";
String sql2= "SELECT * FROM Coffees, Coffees_has_Ingredients, Ingredients WHERE idCoffees = ? AND Coffees_idCoffees = Coffees.idCoffees AND Ingredients_idIngredients = Ingredients.idIngredients";

    public List<Coffee> getAllCoffees() {
        return db.withConnection(conn -> {
            List<Coffee> coffees = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Coffees");
//            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Coffees, Coffees_has_Ingredients, Ingredients WHERE idCoffees = ? AND Coffees_idCoffees = Coffees.idCoffees AND Ingredients_idIngredients = Ingredients.idIngredients")
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                List<Ingredient> ingredientList = getIngredientsByID(rs.getString("title"));
                Coffee coffee = new Coffee(rs, ingredientList);
                coffees.add(coffee);
            }
            stmt.close();
            return coffees;
        });
    }
    /**
     * getIngredients() returns a list of Ingredients by fetching the matching ingredients to title (coffeeID) by JOINing the tables
     */

    public List <Ingredient> getIngredientsByID(String coffeeID){
        return db.withConnection(conn -> {
            List<Ingredient> ingredients = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Ingredients JOIN Coffees_has_Ingredients ON idIngredients = Ingredients_idIngredients JOIN Coffees ON idCoffees = Coffees_idCoffees WHERE title = ?");
            stmt.setString(1, coffeeID);
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


