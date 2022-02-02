package model;

import com.google.inject.Inject;
import data.Coffee;
import data.Customer;
import data.Ingredient;
import play.db.Database;

import javax.inject.Singleton;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class CustomerFetcher {

    private Database db;

    @Inject
    CustomerFetcher(Database db) {
        this.db = db;
    }

    public Customer getCustomerById(int id) {
        return db.withConnection(conn -> {
            Customer customer = null;
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Customer WHERE idCustomer = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                customer = new Customer(rs);
            }
            stmt.close();
            return customer;
        });
    }
    public Customer getCustomerById(String id) {
        return getCustomerById(Integer.parseInt(id));
    }


    public List<Customer> getAllCustomers() {
        return db.withConnection(conn -> {
            List<Customer> customers = new ArrayList<>();
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM Customer");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Customer customer = new Customer(rs);
                customers.add(customer);
            }
            stmt.close();
            return customers;
        });
    }
}
