package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import data.HighScoreFetcher;
import play.libs.Json;
import play.mvc.*;

import views.html.*;

import javax.inject.Inject;
import java.sql.Array;
import java.util.*;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    private final AssetsFinder assetsFinder;

    @Inject
    public HomeController(AssetsFinder assetsFinder) {
        this.assetsFinder = assetsFinder;
    }

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */


    public Result login() {
        return ok(
                login.render(assetsFinder)
        );
    }

    public Result home() {
        return ok(
                home.render("home", assetsFinder)
        );
    }

    public Result highscore() {
        return ok(
                highscore.render("highscore", HighScoreFetcher.getScoreEntryArray(), assetsFinder));
    }

    public Result profile() {
        return ok(
                profile.render("profile", assetsFinder)
        );
    }

    public Result defaultGame() {
        return ok(
                defaultGame.render("gameOne", assetsFinder)
        );
    }


    public Result gameLevelTwo() {
        return ok(
                gameLevelTwo.render("gameTwo", assetsFinder)
        );
    }

    public Result gameLevelTwoMemory() {
        return ok(
                gameLevelTwoMemory.render("gameTwoMemory", assetsFinder)
        );
    }

    public Result store() {
        return ok(
                store.render("Store", assetsFinder)
        );
    }

    public Result checklogin(Http.Request request) {
        JsonNode json = request.body().asJson();
        String username = json.get("username").textValue();
        String password = json.get("password").textValue();

        if (username.equals("admin") && password.equals("admin")) {
            return redirect(routes.HomeController.home().url()).addingToSession(request, "connected", username);
        } else {
            ObjectNode response = Json.newObject();
            response.put("message", "Incorrect password. \nPlease try again.");
            return unauthorized(response);
        }
    }
//    public Result createHighScores(Http.Request request){
//        JsonNode json = request.body().asJson();
//        String username = json.get("name").textValue();
//        String points = json.get("score").textValue();
//
//        return request
//                .session()
//                .get("connected")
//                .map(Results::ok)
//                .orElseGet(()->unauthorized("No one is connected"));
//
//

}

