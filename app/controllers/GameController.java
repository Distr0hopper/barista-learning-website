package controllers;

import akka.http.impl.engine.server.ServerTerminationDeadlineReached;
import com.fasterxml.jackson.databind.JsonNode;
import model.UserFactory;
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
    private final UserFactory userFactory;

    @Inject
    public GameController(AssetsFinder assetsFinder, UserController userController, UserFactory userFactory) {
        this.assetsFinder = assetsFinder;
        this.userController = userController;
        this.userFactory = userFactory;
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


    public Result requestMoney(Http.Request request){
        JsonNode json = request.body().asJson();
        int money = json.get("moneyKey").intValue();
        int id = Integer.parseInt(request.session().get("userID").get());
        UserFactory.User user = userFactory.getUserById(id);
        user.setPoints(money);
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
}
