package data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class HighScoreFetcher {
    static String [] names = {"coffelover1", "arrivewindlass","advisoruniverse", "hosttax","assistancerwandan","deepratio","telephonefreezing","sugarginger","wildcatextraneous","habitattreasured", "folkexpand", "supposeits", "constituteribbit", "automaticinvent", "tensebonnet", "lumberingrespond", "sovietgymnasium", "asleepcathead",
            "optionyearly",
            "evilmaster",
            "observerdanger",
            "wornoutlumbar",
            "photographfrail",
            "jitterytermite",
            "certainflushed",
            "serpentinewham",
            "gassatisfying",

    };
    static List<ScoreEntry> scoreNameObjects = new ArrayList<ScoreEntry>();

    /**
     * Gibt ein Array aus 20 Integern zwischen 1 und 1000
     * kreieren erst 20 randomisierte Nummern in einem IntStream, diese können wir aber nur in natürlicher order sortieren
     * daraufhin wandeln wir unseren IntStream in einen Stream von Integers (Stream<Integer>) um
     * dann sortieren wir in absteigender Reihenfolge
     * daraufhin drehen wir Stream<Integer> wieder zu einem intStream
     * to machen diesen zu einem Array
     */
    public static int[] getSortedPoints(){
        Random random = new Random();
        //        20 random Nummern generieren
        return random.ints(20, 1, 1000)//bekommen IntStream aber können den nur in natürlichen order sortieren
                .boxed()//um andersrum sortieren brauchen wir Stream von Integers (Stream<Integer>)
                .sorted(Collections.reverseOrder())//jetzt sortieren in absteigender Reihenfolge
                .mapToInt(Integer::intValue)//jetzt drehen wir Stream<Integer> wieder zu intStream
                .toArray();//der wird zu Array gemacht
    }
    /**Für jeden score in unserer ScoreListe kreieren wir einen neuen scoreEntry
     * diesen Liste können wir uns mithilfe der Methode holen*/
    public static List<ScoreEntry> getScoreEntryArray(){
        int [] scorePoints = getSortedPoints();
        for (int scoreEntry = 0; scoreEntry < scorePoints.length; scoreEntry++) {
            scoreNameObjects.add(new ScoreEntry(scorePoints[scoreEntry], names[scoreEntry]));
        }
        return scoreNameObjects;
    }

}
