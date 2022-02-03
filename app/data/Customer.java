package data;

import java.sql.ResultSet;
import java.sql.SQLException;

public class Customer {
    private int idCustomer;
    private String customerImgPath;
    private String name;

    public Customer(ResultSet rs) throws SQLException {
        this.idCustomer = rs.getInt("idCustomer");
        this.customerImgPath = rs.getString("customerImgPath");
        this.name = rs.getString("name");
    }


    private Customer(int idCustomer,String customerImgPath, String name) {
        this.idCustomer = idCustomer;
        this.customerImgPath = customerImgPath;
        this.name = name;
    }

    public int getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(int idCustomer) {
        this.idCustomer = idCustomer;
    }

    public String getCustomerImgPath() {
        return customerImgPath;
    }

    public void setCustomerImgPath(String customerImgPath) {
        this.customerImgPath = customerImgPath;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
