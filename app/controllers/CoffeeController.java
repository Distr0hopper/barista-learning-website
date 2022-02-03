package controllers;

import model.CoffeeFetcher;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

//here also methods regarding ingredients

public class CoffeeController extends Controller {
    private final CoffeeFetcher coffeeFetcher;

    @Inject
    public CoffeeController(CoffeeFetcher coffeeFetcher) {
        this.coffeeFetcher = coffeeFetcher;
    }


    public Result getCoffees() {
        return ok(Json.toJson(coffeeFetcher.getAllCoffees()));
    }
}
