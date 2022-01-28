package controllers;

import model.CoffeeFetcher;
import model.IngredientFetcher;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

public class APIController extends Controller {
    private final CoffeeFetcher coffeeFetcher;
    private final IngredientFetcher ingredientFetcher;

    @Inject
    public APIController(CoffeeFetcher coffeeFetcher, IngredientFetcher ingredientFetcher) {
        this.coffeeFetcher = coffeeFetcher;
        this.ingredientFetcher = ingredientFetcher;
    }

    public Result getCoffees() {
        return ok(Json.toJson(coffeeFetcher.getAllCoffees()));
    }

//    TODO fetch Userpoints
//    public Result getUserById() {
//        return ok(Json.toJson(UserFactory.getUserById("user");
//    }
}
