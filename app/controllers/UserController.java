package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.UserFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import views.html.createAccount;
import views.html.forgotPassword;
import views.html.login;
import views.html.profile;

import javax.inject.Inject;

import static play.mvc.Results.*;

public class UserController extends Controller {

    private final UserFactory userFactory;
    private final AssetsFinder assetsFinder;


    @Inject
    public UserController(UserFactory userFactory, AssetsFinder assetsFinder) {
        this.userFactory = userFactory;
        this.assetsFinder = assetsFinder;
    }

    public Result createAccount(){
        return ok(
                createAccount.render("createAccount", assetsFinder)
        );
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
            return redirect(routes.UserController.login().url());
        }
    }



    public boolean isLoggedIn(Http.Request request) {
        return request.session().get("connected").isPresent();
    }

    public Result login() {
        return ok(
                login.render(assetsFinder));
    }

    public Result checklogin(Http.Request request) {
        JsonNode json = request.body().asJson();
        String username = json.get("username").textValue();
        String password = json.get("password").textValue();
        int money = 0;
        UserFactory.User user = userFactory.authenticate(username,password);
        UserFactory.User userID = userFactory.getUserByUsername(username);
        int id = userID.getId(); // add user id on the session

        if (user != null){
            System.out.println(user);
            return status(200, Json.toJson(user))
                    /**
                     * withHeader: HttP Response besteht aus Header und Body, legen neuen Header fest weil bei redirect wenn fetch aufruft nicht Body returned sondern url wo seite hinreturned wird*/
                    .withHeader("Location", routes.HomeController.main().url())
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
                return redirect(routes.UserController.login().url());
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

    public Result logout(){
        return redirect(routes.UserController.login().url()).withNewSession();
    }

}
