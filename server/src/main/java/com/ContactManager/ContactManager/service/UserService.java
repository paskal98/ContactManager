package com.ContactManager.ContactManager.service;

import com.ContactManager.ContactManager.DAO.UserDAO;
import com.ContactManager.ContactManager.DAO.UserRepository;
import com.ContactManager.ContactManager.entity.User;
import com.ContactManager.ContactManager.entity.UserAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService  implements UserDetailsService {


    @Autowired
    UserRepository userRepository;

    @Autowired
    UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));

        return user.map(UserAuth::new).get();
    }


    public User getUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        user.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));



        return user.get();
    }


    @Transactional
    public void CreateNewUser(User user){
        userDAO.CreateNewUser(user);
    }

    @Transactional
    public User FindUserByEmail(String email){
        return  userDAO.FindUserByEmail(email);
    }


}
