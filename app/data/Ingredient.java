package data;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Ingredient {
    private int id;
    private String name;
    private String imgPath;

    public Ingredient(ResultSet rs) throws SQLException {
        this.id = rs.getInt("idIngredients");
        this.name = rs.getString("name");
        this.imgPath = rs.getString("imagePath");
    }

    private Ingredient(int id, String name, String imgPath) {
        this.id = id;
        this.name = name;
        this.imgPath = imgPath;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

}
