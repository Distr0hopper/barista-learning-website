package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;
import play.mvc.*;

import views.html.*;

import javax.inject.Inject;

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


    public Result login(){
        return ok(
                login.render(assetsFinder)
        );
    }

    public Result createAccount(){
        return ok(
                createAccount.render("createAccount",assetsFinder)
        );
    }

    public Result forgotPassword(){
        return ok(
                forgotPassword.render("forgotPassword",assetsFinder)
        );
    }

    public Result home(){
        return ok(
                home.render("home",assetsFinder)
        );
    }

    public Result highscore(){
        return ok(
                highscore.render("highscore",assetsFinder)
        );
    }

    public Result profile(){
        return ok(
                profile.render("profile",assetsFinder)
        );
    }

    public Result defaultGame(){
        return ok(
                defaultGame.render("gameOne",assetsFinder)
        );
    }


    public Result gameLevelTwo(){
        return ok(
                gameLevelTwo.render("gameTwo",assetsFinder)
        );
    }

    public Result store(){
        return ok(
                store.render("Store",assetsFinder)
        );
    }
    public Result checklogin(Http.Request request){
        JsonNode json = request.body().asJson();
        String username = json.get("username").textValue();
        String password = json.get("password").textValue();

        if (username.equals("admin") && password.equals("admin")){
            return redirect(routes.HomeController.home().url()).addingToSession(request, "connected",username);
        } else {
            ObjectNode response = Json.newObject();
            response.put("message","Incorrect password. \nPlease try again.");
            return unauthorized(response);
        }
    }

    public Result checkCreateAccount(Http.Request request){
        JsonNode json = request.body().asJson();
        String email = json.get("email").textValue();
        String username = json.get("username").textValue();
        String password1 = json.get("password").textValue();
        String password2 = json.get("password2").textValue();

        if(email.length() != 0 && username.length() != 0 && password1.length() != 0 && password2.length() != 0){
            if(password1.equals(password2)){
                return redirect(routes.HomeController.home().url()).addingToSession(request, "connected", username);
            }else{
                ObjectNode response = Json.newObject();
                response.put("message", "Your passwords do not match, please try again");
                return unauthorized(response);
            }

        }else{
            ObjectNode response = Json.newObject();
            response.put("message", "Please fill in all of the required fields");
            return unauthorized(response);
        }
    }
}
