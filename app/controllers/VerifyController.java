package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.UserFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;

import javax.inject.Inject;

/**
 * Has functions with verfying logic
 * */

public class VerifyController extends Controller {

    private final UserFactory userFactory;

    @Inject
    public VerifyController(UserFactory userFactory) {
        this.userFactory = userFactory;
    }
    public boolean isLoggedIn(Http.Request request) {
        return request.session().get("connected").isPresent();
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

        if (user != null){
//            Json object is body content
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
                return redirect(routes.HomeController.login().url());
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

}
