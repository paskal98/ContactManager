package com.ContactManager.ContactManager.DAO;

import com.ContactManager.ContactManager.entity.User;
import org.hibernate.Session;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


@Repository
public class UserDAOImpl implements UserDAO{

    @Autowired
    private EntityManager entityManager;

    @Override
    public Optional<User> findByUserName(String UserName) {

        Session session = entityManager.unwrap(Session.class);
        Optional<User> user= Optional.of(session.get(User.class,UserName));

        return user;

    }


    @Override
    public void CreateNewUser(User user) {

        Session session = entityManager.unwrap(Session.class);

        session.saveOrUpdate(user);


    }


    @Override
    public User FindUserByEmail(String email){

        System.out.println(email);

        Session session = entityManager.unwrap(Session.class);
        Query query=session.createQuery("select user from User as user where user.emailId=:email");
        query.setParameter("email",email);
        List<User> user = query.getResultList();
        if (user.size()!=0) {
            return user.get(0);
        } else {
            return  null;
        }

    }

}
