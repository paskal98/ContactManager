package com.ContactManager.ContactManager.DAO;

import com.ContactManager.ContactManager.entity.User;

import java.util.Optional;

public interface UserDAO {

    public Optional<User> findByUserName(String UserName);

    public  void CreateNewUser(User user);

    public  User FindUserByEmail(String email);
}
