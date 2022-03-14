package controllers;

import model.CoffeeFetcher;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

public class CoffeeController extends Controller {
    private final CoffeeFetcher coffeeFetcher;

    @Inject
    public CoffeeController(CoffeeFetcher coffeeFetcher) {
        this.coffeeFetcher = coffeeFetcher;
    }

    /**
     * is the corresponding render method to getAllCoffees
     * gets all Coffees from the database
     * Called when the '/' route receives a GET.
     * @return JSON Result of all Coffees
     */
    public Result getCoffees() {
        return ok(Json.toJson(coffeeFetcher.getAllCoffees()));
    }
}
