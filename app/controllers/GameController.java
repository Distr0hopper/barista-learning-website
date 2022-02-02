package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import model.CustomerFetcher;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import views.html.defaultGame;
import views.html.gameLevelTwo;
import views.html.gameLevelTwoMemory;

import javax.inject.Inject;

public class GameController extends Controller {
    private final AssetsFinder assetsFinder;
    private final UserController userController;
    private final CustomerFetcher customerFetcher;

    @Inject
    public GameController(AssetsFinder assetsFinder, UserController userController, CustomerFetcher customerFetcher) {
        this.assetsFinder = assetsFinder;
        this.userController = userController;
        this.customerFetcher = customerFetcher;
    }


    public Result defaultGame(Http.Request request) {
        if(userController.isLoggedIn(request)) {
            String money = request.session().get("money").get();
            return ok(
                    defaultGame.render("gameOne", money, assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }


    public Result requestMoney(Http.Request request){
        JsonNode json = request.body().asJson();
        int money = json.get("moneyKey").intValue();
        return redirect(routes.GameController.defaultGame().url()).addingToSession(request,"money", String.valueOf(money));
    }

    public Result gameLevelTwo(Http.Request request) {
        if (userController.isLoggedIn(request)) {
            String money = request.session().get("money").get();
            return ok(
                    gameLevelTwo.render("gameTwo",money, assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }

    public Result gameLevelTwoMemory(Http.Request request) {
        if (userController.isLoggedIn(request)){
            String money = request.session().get("money").get();
            return ok(
                    gameLevelTwoMemory.render("GameTwoMemory",money, assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }

    public Result getCustomers() {
        return ok(Json.toJson(customerFetcher.getAllCustomers()));
    }
}
