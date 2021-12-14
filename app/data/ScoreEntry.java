package data;

public class ScoreEntry {
    int score;
    String username;

    public ScoreEntry(int score, String username) {
        this.score = score;
        this.username = username;
    }

    /**
     * getter damit access aus highscores möglich ist
     * @return
     */
    public int getScore() {
        return score;
    }

    public String getUsername() {
        return username;
    }

}
