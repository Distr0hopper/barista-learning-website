package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.CoffeeFetcher;
import model.IngredientFetcher;
import model.UserFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import javax.inject.Inject;
import java.util.Optional;

public class APIController extends Controller {
    private final CoffeeFetcher coffeeFetcher;
    private final IngredientFetcher ingredientFetcher;
    private final UserFactory userFactory;

    @Inject
    public APIController(CoffeeFetcher coffeeFetcher, IngredientFetcher ingredientFetcher, UserFactory userFactory) {
        this.coffeeFetcher = coffeeFetcher;
        this.ingredientFetcher = ingredientFetcher;
        this.userFactory = userFactory;
    }

    public Result getCoffees() {
        return ok(Json.toJson(coffeeFetcher.getAllCoffees()));
    }

    public Result getFriends(Http.Request request){
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);
        return ok(Json.toJson(userFactory.getFriendsById(userID)));
    }
}
