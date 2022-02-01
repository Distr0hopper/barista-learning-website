package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import model.CoffeeFetcher;
import model.UserFactory;
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
    private final APIController apiController;
    private final VerifyController verifyController;

    @Inject
    public HomeController(AssetsFinder assetsFinder, UserFactory userFactory, CoffeeFetcher coffeeFetcher, APIController apiController, VerifyController verifyController) {
        this.assetsFinder = assetsFinder;
        this.userFactory = userFactory;
        this.coffeeFetcher = coffeeFetcher;
        this.apiController = apiController;
        this.verifyController = verifyController;
    }

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     *
     * Has functions refarding the Sites - returning ok
     */

    public Result login() {
        return ok(
                login.render(assetsFinder));
    }

    public Result main(Http.Request request) {
        if (verifyController.isLoggedIn(request)) {
            String money = request.session().get("money").get();
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            return ok(
                    main.render("main",money ,assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());

      }
  }

    public Result highscore(Http.Request request) {
        if(verifyController.isLoggedIn(request)) {
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
        if(verifyController.isLoggedIn(request)) {
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
        if(verifyController.isLoggedIn(request)) {
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
        if (verifyController.isLoggedIn(request)) {
            String money = request.session().get("money").get();
            return ok(
                    gameLevelTwo.render("gameTwo",money, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());
        }

    }

    public Result gameLevelTwoMemory(Http.Request request) {
        if (verifyController.isLoggedIn(request)){
            String money = request.session().get("money").get();
            return ok(
                    gameLevelTwoMemory.render("GameTwoMemory",money, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());
        }

    }

    public Result store(Http.Request request) {
        if(verifyController.isLoggedIn(request)){
            String money = request.session().get("money").get();
            return ok(
                    store.render("Store", money, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());
        }

    }

    public Result dictionary(Http.Request request) {
        if(verifyController.isLoggedIn(request)){
            String money = request.session().get("money").get();
            return ok(
                    dictionary.render("Dictionary", money, assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.login().url());
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


}

