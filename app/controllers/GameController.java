package controllers;

import akka.http.impl.engine.server.ServerTerminationDeadlineReached;
import akka.http.javadsl.model.Query;
import com.fasterxml.jackson.databind.JsonNode;
import model.CustomerFetcher;
import model.IngredientFetcher;
import model.UserFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import views.html.*;

import javax.inject.Inject;
import java.util.List;


public class GameController extends Controller {
    private final AssetsFinder assetsFinder;
    private final UserController userController;
    private final UserFactory userFactory;
    private final CustomerFetcher customerFetcher;
    private final IngredientFetcher ingredientFetcher;


    @Inject
    public GameController(AssetsFinder assetsFinder, UserController userController, UserFactory userFactory, CustomerFetcher customerFetcher, IngredientFetcher ingredientFetcher) {
        this.assetsFinder = assetsFinder;
        this.userController = userController;
        this.userFactory = userFactory;
        this.customerFetcher = customerFetcher;
        this.ingredientFetcher = ingredientFetcher;
    }

    /**
     * An action that renders the HTML defaultGame page.
     * Checks if there is a user in the session and get his points from the database.
     * Get all ingredients from the database (?).
     * @param request Request the sessionstorage.
     * @return Ok
     */
    public Result defaultGame(Http.Request request) {
        if(userController.isLoggedIn(request)) {
            List<data.Ingredient> ingredients = ingredientFetcher.getAllIngredients();
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    defaultGame.render("gameOne", String.valueOf(money), ingredients, assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }


    public int updateRanking(int money){
         if (money >= 60 && money < 200){
            return 2;
         } else if (money >= 200 && money < 460){
            return 3;
         } else if (money >= 460 && money < 600){
           return 4;
         } else if (money >= 600){
           return 5;
         }
         return 1;
    }

    public Result requestMoney(Http.Request request){
        JsonNode json = request.body().asJson();
        int money = json.get("moneyKey").intValue();
        int id = Integer.parseInt(request.session().get("userID").get());
        UserFactory.User user = userFactory.getUserById(id);
        user.setPoints(money);
        System.out.println(updateRanking(money));
        user.setReward(updateRanking(money));
        user.save();
        return redirect(routes.GameController.defaultGame().url()).addingToSession(request,"money", String.valueOf(money));
    }

    public Result gameLevelTwo(Http.Request request) {
        if (userController.isLoggedIn(request)) {
            List<data.Ingredient> ingredients = ingredientFetcher.getAllIngredients();
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
//                    gameLevelTwo.render("gameTwo",String.valueOf(money), assetsFinder)
                    gameLevelTwo.render("gameTwo",String.valueOf(money), ingredients, assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }
    public Result gameLevelThreeGame1(Http.Request request) {
        if (userController.isLoggedIn(request)) {
            List<data.Ingredient> ingredients = ingredientFetcher.getAllIngredients();
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    gameLevelThreeGame1.render("GameThreeGame1",String.valueOf(money), ingredients, assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }

    public Result gameLevelTwoMemory(Http.Request request) {
        if (userController.isLoggedIn(request)){
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    gameLevelTwoMemory.render("GameTwoMemory", String.valueOf(money), assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }

    public Result gameLevelThreeMemory(Http.Request request) {
        if (userController.isLoggedIn(request)){
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    gameLevelThreeMemory.render("GameThreeMemory", String.valueOf(money), assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }


    public Result gameLevelThree(Http.Request request) {
        if (userController.isLoggedIn(request)) {
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    gameLevelThree.render("GameThree",String.valueOf(money), assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }

    public Result getCustomers() {
        return ok(Json.toJson(customerFetcher.getAllCustomers()));
    }
}
