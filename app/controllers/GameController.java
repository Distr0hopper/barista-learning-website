package controllers;

import akka.http.impl.engine.server.ServerTerminationDeadlineReached;
import com.fasterxml.jackson.databind.JsonNode;
import model.CustomerFetcher;
import model.UserFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import views.html.defaultGame;
import views.html.gameLevelThree;
import views.html.gameLevelTwo;
import views.html.gameLevelTwoMemory;

import javax.inject.Inject;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class GameController extends Controller {
    private final AssetsFinder assetsFinder;
    private final UserController userController;
    private final UserFactory userFactory;
    private final CustomerFetcher customerFetcher;

    @Inject
    public GameController(AssetsFinder assetsFinder, UserController userController, UserFactory userFactory, CustomerFetcher customerFetcher) {
        this.assetsFinder = assetsFinder;
        this.userController = userController;
        this.userFactory = userFactory;
        this.customerFetcher = customerFetcher;
    }


    public Result defaultGame(Http.Request request) {
        if(userController.isLoggedIn(request)) {
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    defaultGame.render("gameOne", String.valueOf(money), assetsFinder)
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
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    gameLevelTwo.render("gameTwo",String.valueOf(money), assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }
    public Result gameLevelThreeGame1(Http.Request request) {
        if (userController.isLoggedIn(request)) {
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    gameLevelTwo.render("GameThree",String.valueOf(money), assetsFinder)
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
                    gameLevelTwoMemory.render("GameThreeMemory", String.valueOf(money), assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }


    public Result gameLevelThree(Http.Request request) {
        if (userController.isLoggedIn(request)) {
            String money = request.session().get("money").get();
            return ok(
                    gameLevelThree.render("gameThree",money, assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }

    public Result getCustomers() {
        return ok(Json.toJson(customerFetcher.getAllCustomers()));
    }
}
