package com.ContactManager.ContactManager.DAO;

import com.ContactManager.ContactManager.entity.Contacts;
import com.ContactManager.ContactManager.entity.User;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class ContactDAOImpl implements ContactDAO {

    @Autowired
    EntityManager entityManager;

    private User getCurrentUser(Session session,String username){
        Query query=session.createQuery("select user from User user where user.username=:username ");
        query.setParameter("username",username);
        List<User> user= (query.getResultList());
        return user.get(0);
    }

    @Override
    public List<Contacts> getAllContacts(String username) {
        Session session = entityManager.unwrap(Session.class);


        Query query=session.createQuery("select contacts from Contacts contacts where contacts.users.username=:username");
        query.setParameter("username",username);

        List<Contacts> allContacts = query.getResultList();

        return allContacts;
    }

    @Override
    public Contacts getContactById(int id, String username) {

        Session session = entityManager.unwrap(Session.class);


        Query query=session.createQuery("select contacts from Contacts contacts where (contacts.users.username=:username and contacts.id=:id)");
        query.setParameter("username",username);
        query.setParameter("id",id);

        List<Contacts> contacts = query.getResultList();

        return contacts.get(0);

    }

    @Override
    public void addNewContact(Contacts contact) {
        Session session = entityManager.unwrap(Session.class);

        System.out.println(contact);

        session.saveOrUpdate(contact);

    }

    @Override
    public void deleteContact(int id) {

        Session session = entityManager.unwrap(Session.class);
        Query query = session.createQuery("delete from Contacts as contact where contact.id=:id");
        query.setParameter("id",id);
        query.executeUpdate();

    }
}
