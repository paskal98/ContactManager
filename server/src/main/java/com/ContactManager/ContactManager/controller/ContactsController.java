package com.ContactManager.ContactManager.controller;

import com.ContactManager.ContactManager.entity.Contacts;
import com.ContactManager.ContactManager.entity.User;
import com.ContactManager.ContactManager.entity.UserAuth;
import com.ContactManager.ContactManager.holders.CallBackStatus;
import com.ContactManager.ContactManager.holders.UserData;
import com.ContactManager.ContactManager.service.ContactsService;
import com.ContactManager.ContactManager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.server.Cookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ContactsController {



    @Autowired
    private ContactsService contactsService;

    @Autowired
    private AuthController authController;



    @GetMapping("/contacts")
    public List<Contacts> showAllContacts( Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        List<Contacts> allContacts = contactsService.getAllContacts(userDetails.getUsername());

        return allContacts;

    }

    @GetMapping("/contacts/{id}")
    public Contacts ContactById(@PathVariable int id ,Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Contacts contacts = contactsService.getContactById(id,userDetails.getUsername());

        return contacts;

    }

    @PostMapping("/contacts")
    public CallBackStatus addNewContact(@RequestBody Contacts contact, Authentication authentication){

        contact.setUsers(authController.getCurrentUser(authentication));
        contactsService.addNewContact(contact);


        return new CallBackStatus(200,""+contact.getId());

    }



    @PutMapping("/contacts")
    public CallBackStatus updateContact(@RequestBody Contacts contact,Authentication authentication){


        contact.setUsers(authController.getCurrentUser(authentication));
        contactsService.addNewContact(contact);

        return new CallBackStatus(200,"OK");

    }

    @DeleteMapping("/contacts/{id}")
    public CallBackStatus deleteContact(@PathVariable int id,Authentication authentication){


        contactsService.deleteContact(id);

        return new CallBackStatus(200,"OK");

    }

}
