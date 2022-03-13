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

    /**
     * gets the coffee with the corresponding id in the parameter from the database and returns it
     * @param id
     * @return Coffee
     */
    public Coffee getCoffeeById(int id) {
        return db.withConnection(conn -> {
            Coffee coffee = null;
            PreparedStatement stmt = conn.prepareStatement("SELECT Coffees.?, group_concat(Ingredients.name) AS ingredientList " +
                    "FROM Coffees, Ingredients, Coffees_has_Ingredients " +
                    "WHERE Coffees.idCoffees = Coffees_has_Ingredients.Coffees_idCoffees AND idCoffees = ? " +
                    "AND Coffees_has_Ingredients.Ingredients_idIngredients = Ingredients.idIngredients " +
                    "GROUP BY Coffees.idCoffees ");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                coffee = new Coffee(rs);
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
     * Ingredientlist is added like this into the Coffee Class and the entire new Coffee is built and returned
     */

    public List<Coffee> getAllCoffees() {
        return db.withConnection(conn -> {
            List<Coffee> coffees = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT Coffees.*, group_concat(Ingredients.name) AS ingredientList " +
                    "FROM Coffees, Ingredients, Coffees_has_Ingredients " +
                    "WHERE Coffees.idCoffees = Coffees_has_Ingredients.Coffees_idCoffees " +
                    "AND Coffees_has_Ingredients.Ingredients_idIngredients = Ingredients.idIngredients " +
                    "GROUP BY Coffees.idCoffees");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Coffee coffee = new Coffee(rs);
                coffees.add(coffee);
            }
            stmt.close();
            return coffees;
        });
    }
}
