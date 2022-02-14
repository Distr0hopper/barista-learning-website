package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import model.ChatFactory;
import model.FriendshipFactory;
import model.UserFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import views.html.highscore;

import javax.inject.Inject;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//    here also methods regarding rewards and chat

public class SocialPageController extends Controller {

    private final UserFactory userFactory;
    private final UserController userController;
    private final FriendshipFactory friendshipFactory;
    private final ChatFactory chatFactory;
    private final AssetsFinder assetsFinder;
    private List<String> userNamesList = new ArrayList<>();
    private List<UserFactory.User> friends = new ArrayList<>();

    @Inject
    public SocialPageController(UserFactory userFactory, UserController userController, FriendshipFactory friendshipFactory, ChatFactory chatFactory, AssetsFinder assetsFinder) {
        this.userFactory = userFactory;
        this.userController = userController;
        this.friendshipFactory = friendshipFactory;
        this.chatFactory = chatFactory;
        this.assetsFinder = assetsFinder;
    }


    public Result getFriends(Http.Request request){
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);
        return ok(Json.toJson(userFactory.getFriendsById(userID)));
    }

    public Result highscore(Http.Request request) {
        if(userController.isLoggedIn(request)) {
            List<UserFactory.User> users = userFactory.getAllUsersDesc();
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    highscore.render("highscore", String.valueOf(money), users, id, assetsFinder));
        } else {
            return redirect(routes.UserController.login().url());
        }
    }

    public Result createFriendship(Http.Request request) {
        JsonNode json = request.body().asJson();
        String friend = json.get("username").textValue();
        int friendId = userFactory.getUserByUsername(friend).getId();
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);
        friendshipFactory.createFriendship(userID, friendId);
        return redirect(routes.HomeController.socials().url());
}

    public Result getEveryone(Http.Request request){
        return ok(Json.toJson(userFactory.getAllUsernames()));
    }

    public Result getNotFriends(Http.Request request){
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);
        friends = userFactory.getFriendsById(userID);
        userNamesList = userFactory.getAllUsernames();
        for (UserFactory.User friend : friends){
            if (userNamesList.contains(friend.getUsername())){
                userNamesList.remove(friend.getUsername());
            }
        }
        return ok(Json.toJson(userNamesList));
    }

    public Result getMessages(Http.Request request){
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);
        return ok(Json.toJson(chatFactory.getAllMessages(userID)));
    }

    public Result sendMessage(Http.Request request){
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);

        JsonNode json = request.body().asJson();
        String message = json.get("message").textValue();
        String friend = json.get("friend").textValue();
        int friendId = userFactory.getUserByUsername(friend).getId();

        chatFactory.createMessage(userID, friendId, message, userID);
        return redirect(routes.HomeController.socials().url());
    }
}
