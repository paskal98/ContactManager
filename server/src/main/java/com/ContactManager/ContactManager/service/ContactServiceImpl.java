package com.ContactManager.ContactManager.service;

import com.ContactManager.ContactManager.DAO.ContactDAO;
import com.ContactManager.ContactManager.entity.Contacts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ContactServiceImpl implements  ContactsService{

    @Autowired
    ContactDAO contactDAO;


    @Override
    @Transactional
    public List<Contacts> getAllContacts(String username) {
        return contactDAO.getAllContacts(  username);
    }

    @Override
    @Transactional
    public Contacts getContactById(int id, String username) {
        return contactDAO.getContactById(id,username);
    }

    @Override
    @Transactional
    public void addNewContact(Contacts contact) {
        contactDAO.addNewContact( contact);
    }

    @Override
    @Transactional
    public void deleteContact(int id) {
        contactDAO.deleteContact (id);
    }
}
