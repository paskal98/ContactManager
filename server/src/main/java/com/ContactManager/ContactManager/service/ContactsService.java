package com.ContactManager.ContactManager.service;

import com.ContactManager.ContactManager.entity.Contacts;

import java.util.List;

public interface ContactsService {

    public List<Contacts> getAllContacts(String username);

    public Contacts getContactById(int id, String username);

    public void addNewContact(Contacts contact);

    public void deleteContact (int id);
}
