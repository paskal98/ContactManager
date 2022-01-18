package com.ContactManager.ContactManager.DAO;

import com.ContactManager.ContactManager.entity.Contacts;

import java.util.List;

public interface ContactDAO {

    public List<Contacts> getAllContacts(String username);

    public Contacts getContactById(int id,String username);

    public void addNewContact(Contacts contact);

    public void deleteContact(int id);
}
