package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.CoffeeFetcher;
import model.UserFactory;
import play.libs.Json;
import play.mvc.*;
import views.html.*;


import javax.inject.Inject;
import java.util.List;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {
    private final AssetsFinder assetsFinder;
    private final UserFactory userFactory;
    private final CoffeeFetcher coffeeFetcher;

    @Inject
    public HomeController(AssetsFinder assetsFinder, UserFactory userFactory, CoffeeFetcher coffeeFetcher) {
        this.assetsFinder = assetsFinder;
        this.userFactory = userFactory;
        this.coffeeFetcher = coffeeFetcher;
    }

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */

    public boolean isLoggedIn(Http.Request request) {
        return request.session().get("connected").isPresent();
    }

    public Result login() {
        return ok(
               login.render(assetsFinder));
    }

    public Result main(Http.Request request) {
        if (isLoggedIn(request)) {
            String money = request.session().get("money").get();
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            return ok(
                    main.render("main", money, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());

      }
  }

//        return ok(
//                main.render("main", money, assetsFinder)
//        );
//    }



    public Result highscore(Http.Request request) {
        if(isLoggedIn(request)) {
            List<UserFactory.User> users = userFactory.getAllUsersDesc();
            String money = request.session().get("money").get();
            int id = Integer.parseInt(request.session().get("userID").get());
            return ok(
                    highscore.render("highscore", money, users, id, assetsFinder));
        } else {
            return redirect(routes.HomeController.login().url());
        }

    }

    public Result profile(Http.Request request) {
        if(isLoggedIn(request)) {
//            List<UserFactory.User> users = userFactory.getAllUsers();
            String money = request.session().get("money").get();
            int id = Integer.parseInt(request.session().get("userID").get());

            UserFactory.User user = userFactory.getUserById(id);

            return ok(
                    profile.render("profile", money, user, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());
        }
    }

    public Result defaultGame(Http.Request request) {
        if(isLoggedIn(request)) {
            String money = request.session().get("money").get();
            return ok(
                    defaultGame.render("gameOne", money, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());
        }

    }


    public Result requestMoney(Http.Request request){
        JsonNode json = request.body().asJson();
        int money = json.get("moneyKey").intValue();
        return redirect(routes.HomeController.defaultGame().url()).addingToSession(request,"money", String.valueOf(money));
    }

    public Result gameLevelTwo(Http.Request request) {
        if (isLoggedIn(request)) {
            String money = request.session().get("money").get();
            return ok(
                    gameLevelTwo.render("gameTwo",money, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());
        }

    }

    public Result gameLevelTwoMemory(Http.Request request) {
        if (isLoggedIn(request)){
            String money = request.session().get("money").get();
            return ok(
                    gameLevelTwoMemory.render("gameTwoMemory",money, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());
        }

    }

    public Result store(Http.Request request) {
        if(isLoggedIn(request)){
            String money = request.session().get("money").get();
            return ok(
                    store.render("Store", money, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());
        }

    }

    public Result dictionary(Http.Request request) {
        if(isLoggedIn(request)){
            String money = request.session().get("money").get();
            return ok(
                    dictionary.render("Dictionary", money, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());
        }

    }

    public Result checklogin(Http.Request request) {
        JsonNode json = request.body().asJson();
        String username = json.get("username").textValue();
        String password = json.get("password").textValue();
        int money = 0;
        UserFactory.User user = userFactory.authenticate(username,password);
        UserFactory.User userID = userFactory.getUserByUsername(username);
        int id = userID.getId(); // add user id on the session
        //if (username.equals("admin") && password.equals("admin")) {
        if (userFactory.authenticate(username,password ) != null){
            return redirect(routes.HomeController.main().url())
                    .addingToSession(request, "connected", username)
                    .addingToSession(request, "userID", String.valueOf(id))
                    .addingToSession(request,"money", String.valueOf(money));
        } else {
            ObjectNode response = Json.newObject();
            response.put("message", "Incorrect password. \nPlease try again.");
            return unauthorized(response);
        }
    }

    public Result checkCreateAccount(Http.Request request) {
        JsonNode json = request.body().asJson();
        String email = json.get("email").textValue();
        String username = json.get("username").textValue();
        String password = json.get("password").textValue();
        String password2 = json.get("password2").textValue();
        int money = 0;
        if (!username.isEmpty() && !email.isEmpty() && !password.isEmpty() && !password2.isEmpty()) {
            if(password.equals(password2)){

                userFactory.create(username,email,password);
                return redirect(routes.HomeController.login().url());
                //return redirect(routes.HomeController.main().url()).addingToSession(request, "connected", username).addingToSession(request,"money", String.valueOf(money));
            }
            else{
                ObjectNode response = Json.newObject();
                response.put("message", "Your passwords do not match, please try again");
                return unauthorized(response);
            }
        } else {
            ObjectNode response = Json.newObject();
            response.put("message", "Please fill out every field");
            return unauthorized(response);
        }
    }


    public Result forgotPassword() {
        return ok(
                forgotPassword.render("forgotPassword", assetsFinder)
        );
    }

    public Result createAccount(){
        return ok(
                createAccount.render("createAccount", assetsFinder)
        );
    }


    public Result logout(){
        return redirect(routes.HomeController.login().url()).withNewSession();
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

