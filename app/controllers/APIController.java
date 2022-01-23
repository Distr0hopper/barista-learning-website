package controllers;

import model.CoffeeFetcher;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import javax.inject.Inject;

public class APIController extends Controller {
    private final CoffeeFetcher coffeeFetcher;

    @Inject
    public APIController(CoffeeFetcher coffeeFetcher) {
        this.coffeeFetcher = coffeeFetcher;
    }

    public Result getCoffees() {
        return ok(Json.toJson(coffeeFetcher.getAllCoffees()));
    }
}
