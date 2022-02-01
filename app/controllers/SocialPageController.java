package controllers;

import model.UserFactory;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import views.html.highscore;

import javax.inject.Inject;
import java.util.List;

//    here also methods regarding rewards and chat

public class SocialPageController extends Controller {

    private final UserFactory userFactory;
    private final UserController userController;
    private final AssetsFinder assetsFinder;

    @Inject
    public SocialPageController(UserFactory userFactory, UserController userController, AssetsFinder assetsFinder) {
        this.userFactory = userFactory;
        this.userController = userController;
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
            String money = request.session().get("money").get();
            int id = Integer.parseInt(request.session().get("userID").get());
            return ok(
                    highscore.render("highscore", money, users, id, assetsFinder));
        } else {
            return redirect(routes.UserController.login().url());
        }
    }
}
