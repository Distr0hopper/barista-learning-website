package data;

/**
 *  ScoreEntry Class that is used to create, retrieve or save changes to the database
 */
public class ScoreEntry {
    int score;
    String username;

    public ScoreEntry(int score, String username) {
        this.score = score;
        this.username = username;
    }

    /**
     * getter so that access from highscores is possible
     * @return
     */
    public int getScore() {
        return score;
    }

    public String getUsername() {
        return username;
    }

}
