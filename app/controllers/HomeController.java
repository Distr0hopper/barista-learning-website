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
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     *
     * Has functions refarding the Sites - returning ok
     */

    public Result main(Http.Request request) {
        if (userController.isLoggedIn(request)) {
            //String money = request.session().get("money").get();
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    main.render("main",String.valueOf(money) ,assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());

      }
  }

        public Result store(Http.Request request) {
        if(userController.isLoggedIn(request)){
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();

            return ok(
                    store.render("Store", String.valueOf(money), assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }

    public Result dictionary(Http.Request request) {
        if(userController.isLoggedIn(request)){
            int id = Integer.parseInt(request.session().get("userID").get());
            UserFactory.User user = userFactory.getUserById(id);
            int money = user.getPoints();
            return ok(
                    dictionary.render("Dictionary", String.valueOf(money), assetsFinder)
            );
        } else {
            return redirect(routes.UserController.login().url());
        }

    }

    public Result socials(Http.Request request){
        int id = Integer.parseInt(request.session().get("userID").get());
        UserFactory.User user = userFactory.getUserById(id);
        int money = user.getPoints();
        List<UserFactory.User> friends = userFactory.getFriendsById(id);
        return ok(
                socials.render("socials", String.valueOf(money), user, friends, assetsFinder)
        );
    }

}

