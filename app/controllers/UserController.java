package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import data.User;
import model.FriendshipFactory;
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class UserController extends Controller {

    private final UserFactory userFactory;
    private final AssetsFinder assetsFinder;
    private List<String> userNamesList = new ArrayList<>();

//    private List<UserFactory.User> allUsersList = new ArrayList<>();


    @Inject
    public UserController(UserFactory userFactory, AssetsFinder assetsFinder) {
        this.userFactory = userFactory;
        this.assetsFinder = assetsFinder;
    }

    /**
     * Gets all the users from the Database
     * Called when the '/' route receives a GET.
     * @return
     */
    public Result getAllUsers() {
        return ok(
                Json.toJson(userFactory.getAllUsers()));
    }


    /**
     * An action that renders the profile HTML page with the money displayed in the navbar.
     * Also the user itself and his friends are displayed there.
     * Called when the '/user/profile' route receive a GET request.
     * @param request Request the session storage.
     * @return OK if there is a user in the session, else redirect to the login page.
     */
    public Result profile(Http.Request request) {
        if(isLoggedIn(request)) {
            int id = Integer.parseInt(request.session().get("userID").get());
            data.User user = userFactory.getUserById(id);
            List<data.User> friends = userFactory.getFriendsById(id);
            int money = user.getPoints();
            int level = user.getLevel();
            int ranking = user.getRanking();
            return ok(
                    profile.render("profile", String.valueOf(money), level, ranking, user, friends, assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }
    }


    /**
     * Function that checks if there is currently a user logged in.
     * @param request Request the session storage.
     * @return True if there is a user in the session , false if not.
     */
    public boolean isLoggedIn(Http.Request request) {
        return request.session().get("connected").isPresent();
    }

    /**
     * Login HTML page that shows up when the application is started.
     * Called when the '/' route receives a GET.
     * @return
     */
    public Result login(Http.Request request) {
        if(!isLoggedIn(request)){
            return ok(
                    login.render(assetsFinder));
        } else {
            return redirect(routes.HomeController.main().url());
        }

    }

    /**
     * Function that is called when a user wants to log in.
     * Authenticate if the user exist in the database.
     * Get the points and the id of the user.
     * Called when the 'user/auth' route received a POST request.
     * @param request Username and password from the JS as JSON Data.
     * @return Status 200 if the user exist, safe user with key "connected", the id and his points in the session. Else username or password are incorrect.
     */
    public Result checkLogin(Http.Request request) {
        JsonNode json = request.body().asJson();
        String username = json.get("username").textValue();
        String password = json.get("password").textValue();
        data.User user = userFactory.authenticate(username,password);
        data.User userID = userFactory.getUserByUsername(username);
        int money = user.getPoints();
        int id = userID.getId(); // add user id on the session
        int level = userID.getLevel(); // add level id on the session
        if (user != null){
            System.out.println(user);
            return status(200, Json.toJson(user))
                    /**
                     * withHeader: HttP Response besteht aus Header und Body, legen neuen Header fest weil bei redirect wenn fetch aufruft nicht Body returned sondern url wo seite hinreturned wird*/
                    .withHeader("Location", routes.HomeController.main().url())
                    .addingToSession(request, "connected", username)
                    .addingToSession(request, "userID", String.valueOf(id))
                    .addingToSession(request,"money", String.valueOf(money))
                    .addingToSession(request,"level", String.valueOf(level));
        } else {
            ObjectNode response = Json.newObject();
            response.put("message", "Incorrect username or password. \nPlease try again.");
            return unauthorized(response);
        }
    }

    /**
     * An action that renders the createAccount HTML page.
     * Called when the /user/createAccount route receives a GET request.
     * @return OK
     */
    public Result createAccount(Http.Request request){
        if(!isLoggedIn(request)){
            return ok(
                    createAccount.render("createAccount", assetsFinder)
            );
        } else {
            return redirect(routes.HomeController.main().url());
        }
    }

    // TODO: form validation on server to match the rules that are on frontend

    /**
     * Function is called when a new user registers.
     * Checks the input fields which are fetched to the server from the JS as JSON.
     * If any field is empty, throw an error message.
     * Then check if the passwords are equal and the email contains an @.
     * Create user with username, email and password if everything is correct.
     * Called when the '/user/checkCreateAccount' route receives a POST request.
     * @param request JSON Data which contains email, username and password.
     * @return If everything is fine, redirect to login page. Else throw error messages.
     */
    public Result checkCreateAccount(Http.Request request) {
        userNamesList = userFactory.getAllUsernames();
        JsonNode json = request.body().asJson();
        String email = json.get("email").textValue();
        String username = json.get("username").textValue();
        String password = json.get("password").textValue();
        String password2 = json.get("password2").textValue();
        int money = 0;
        if (!username.isEmpty() && !email.isEmpty() && !password.isEmpty() && !password2.isEmpty()) {
            if(password.equals(password2) && email.contains("@") && !userNamesList.contains(username)){
                userFactory.create(username,email,password);
                return redirect(routes.UserController.login().url());
            } else if (!email.contains("@")) {
                ObjectNode response = Json.newObject();
                response.put("message","Your Email needs to contain @");
                return unauthorized(response);
            } else if (userNamesList.contains(username)){
                ObjectNode response = Json.newObject();
                response.put("message","Username already taken!");
                return unauthorized(response);
            } else {
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

    /**
     * Logout function.
     * Called when the logout button is pressed and triggers the '/logout' rout as GET request.
     * @return redirect to login page
     */
    public Result logout(){
        return redirect(routes.UserController.login().url()).withNewSession();
    }


    /**
     * Function that updates the profile picture of the current user.
     * Get the img as JSON and update the picture in the database.
     * Called when the '/user/updatePic' route receives a POST request.
     * @param request Request picture from JS as JSON.
     * @return OK
     */
    public Result updateProfilePic(Http.Request request){
        JsonNode json = request.body().asJson();
        String img = json.get("source").textValue();
        int id = Integer.parseInt(request.session().get("userID").get());
        data.User user = userFactory.getUserById(id);
        user.updateProfilePic(img);
        return ok();
    }

    /**
     * Function that updates the username of the current user.
     * Get the inputfield as JSON, checks if the name exist already in the database.
     * Called when the 'user/updateName' route receives a POST request.
     * If not, update it, else throw error.
     * @param request Inputfield from the JS as JSON.
     * @return Redirect to the profile page or error message.
     */
    public Result updateName(Http.Request request){
        JsonNode json = request.body().asJson();
        String name = json.get("name").textValue();
        int id = Integer.parseInt(request.session().get("userID").get());
        data.User user = userFactory.getUserById(id);
        userNamesList = userFactory.getAllUsernames();
        if(!userNamesList.contains(name) && name.length() > 3 && name.length() < 25){
            user.updateName(name);
            return redirect(routes.UserController.profile().url());
        }
        else{
            ObjectNode response = Json.newObject();
            response.put("message","Cannot change the username! Try another one!");
            return unauthorized(response);
        }
    }

}
