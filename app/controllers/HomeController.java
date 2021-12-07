package controllers;

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

    public Result home(){
        return ok(
                home.render(assetsFinder)
        );
    }

    public Result highscore(){
        return ok(
                highscore.render(assetsFinder)
        );
    }

    public Result profile(){
        return ok(
                profile.render(assetsFinder)
        );
    }

    public Result defaultGame(){
        return ok(
                defaultGame.render(assetsFinder)
        );
    }

    public Result store(){
        return ok(
                store.render("Store",assetsFinder)
        );
    }

    public Result gameLevelTwo(){
        return ok(
                gameLevelTwo.render(assetsFinder)
        );
    }


}
