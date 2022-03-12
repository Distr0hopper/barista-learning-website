package controllers;

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
    private final UserController userController;

    @Inject
    public HomeController(AssetsFinder assetsFinder, UserFactory userFactory, UserController userController) {
        this.assetsFinder = assetsFinder;
        this.userFactory = userFactory;
        this.userController = userController;
    }

    /**
     * An action that renders the HTML main page with the money displayed in the navbar.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/main</code>.
     * @param request Request the session storage.
     * @return OK if there is a user in the session. Else redirect to the login page.
     */
    public Result main(Http.Request request) {
        if (userController.isLoggedIn(request)) {
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            int level = user.getLevel();
            int ranking = user.getRanking();
            return ok(
                    main.render("main", String.valueOf(money), level, ranking, assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());

      }
  }

    /**
     * An action that renders the dictionary HTML page with the money displayed in the navbar.
     * Called when the /dictionary route receive a GET request.
     * @param request Request the session storage.
     * @return OK if there is a user in the session. Else redirect to the login page.
     */
    public Result dictionary(Http.Request request) {
        if(userController.isLoggedIn(request)){
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            int level = user.getLevel();
            int ranking = user.getRanking();
            return ok(
                    dictionary.render("Dictionary", String.valueOf(money), level, ranking, assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }

    /**
     * An action that renders the social HTML page with the money displayed in the navbar,
     * the user profile and the friends displayed there.
     * Called when the /socials route receive a GET request.
     * @param request Request the session storage.
     * @return OK if there is a user in the session. Else redirect to the login page.
     */
    public Result socials(Http.Request request){
        int id = Integer.parseInt(request.session().get("userID").get());
        UserFactory.User user = userFactory.getUserById(id);
        int money = user.getPoints();
        int level = user.getLevel();
        int ranking = user.getRanking();
        List<UserFactory.User> friends = userFactory.getFriendsById(id);
        return ok(
                socials.render("socials", String.valueOf(money), level, ranking, user, friends, assetsFinder)
        );
    }

}

