package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import data.User;
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
import java.util.Collections;
import java.util.List;

//    here also methods regarding rewards and chat

public class SocialPageController extends Controller {

    private final UserFactory userFactory;
    private final UserController userController;
    private final FriendshipFactory friendshipFactory;
    private final ChatFactory chatFactory;
    private final AssetsFinder assetsFinder;
    private List<String> userNamesList = new ArrayList<>();
    private List<User> friends = new ArrayList<>();

    @Inject
    public SocialPageController(UserFactory userFactory, UserController userController, FriendshipFactory friendshipFactory, ChatFactory chatFactory, AssetsFinder assetsFinder) {
        this.userFactory = userFactory;
        this.userController = userController;
        this.friendshipFactory = friendshipFactory;
        this.chatFactory = chatFactory;
        this.assetsFinder = assetsFinder;
    }

    /**
     * gets all the friends for the logged-in user
     * @param request Request the session storage
     * @return json with all friends of the user
     */
    public Result getFriends(Http.Request request){
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);
        return ok(Json.toJson(userFactory.getFriendsById(userID)));
    }

    /**
     * renders the highscore page
     * @param request request the session storage
     * @return ok if the user is logged in. otherwise redirect to the
     * login page
     */
    public Result highscore(Http.Request request) {
        if(userController.isLoggedIn(request)) {
            List<User> users = userFactory.getAllUsersDesc();
            int id = Integer.parseInt(request.session().get("userID").get());
            User user = userFactory.getUserById(id);
            int money = user.getPoints();
            int level = user.getLevel();
            int ranking = user.getRanking();
            return ok(
                    highscore.render("highscore", String.valueOf(money), level, ranking, users, id, assetsFinder));
        } else {
            return redirect(routes.UserController.login().url());
        }
    }

    /**
     * creates a friendship between the logged in user and another user
     * the other user is fetched via a Json Object
     * calls the createFriendship Method of the FriendshipFactory
     * and reloads the socials page
     * @param request Request the session storage
     * @return to social page to display the new friend
     */
    public Result createFriendship(Http.Request request) {
        JsonNode json = request.body().asJson();
        String friend = json.get("username").textValue();
        int friendId = userFactory.getUserByUsername(friend).getId();
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);
        friendshipFactory.createFriendship(userID, friendId);
        return redirect(routes.HomeController.socials().url());
}

    /**
     * deletes the friendship between the logged-in user and another user
     * the other user is fetched via a Json Object
     * calls the deleteMessages and the deleteFriendship methods
     * of the FriendshipFactory
     * @param request Request the session storage.
     * @return to social page to display the list of friends updated
     */
    public Result deleteFriendship(Http.Request request) {
        JsonNode json = request.body().asJson();
        String friend = json.get("friendName").textValue();
        int friendId = userFactory.getUserByUsername(friend).getId();
        String userIDString = request.session().get("userID").get();
        int userId = Integer.parseInt(userIDString);
        friendshipFactory.deleteMessages(userId, friendId);
        friendshipFactory.deleteFriendship(userId, friendId);
        return redirect(routes.HomeController.socials().url());
    }


    /**
     * gets all of the users the logged in users is not friends with
     * @param request Request the session storage
     * @return a Json that contains the list of users
     */
    public Result getNotFriends(Http.Request request){
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);
        friends = userFactory.getFriendsById(userID);
        userNamesList = userFactory.getAllUsernames();
        for (User friend : friends){
            if (userNamesList.contains(friend.getUsername())){
                userNamesList.remove(friend.getUsername());
            }
        }
        return ok(Json.toJson(userNamesList));
    }

    /**
     * gets all the messages a user has either sent or received
     * @param request Request the session storage
     * @return a Json containing all the messages
     */
    public Result getMessages(Http.Request request){
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);
        return ok(Json.toJson(chatFactory.getAllMessages(userID)));
    }

    /**
     * adds a sent message to the database
     * @param request request the session storage
     * @return OK
     */
    public Result sendMessage(Http.Request request){
        String userIDString = request.session().get("userID").get();
        int userID = Integer.parseInt(userIDString);

        JsonNode json = request.body().asJson();
        String message = json.get("message").textValue();
        String friend = json.get("friend").textValue();
        int friendId = userFactory.getUserByUsername(friend).getId();

        chatFactory.createMessage(userID, friendId, message);
        return ok();
    }
}
