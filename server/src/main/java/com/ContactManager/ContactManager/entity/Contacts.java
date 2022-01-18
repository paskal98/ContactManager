package com.ContactManager.ContactManager.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="contacts")
@Data
public class Contacts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private  String surname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "department")
    private  String department;

    @Column(name = "job")
    private String job;

    @Column(name = "birthday")
    private Date birthday;




    @OneToOne(fetch = FetchType.EAGER,orphanRemoval = true,cascade = CascadeType.ALL)
    private User users;

    @JsonManagedReference
    @OneToMany(mappedBy = "contacts",fetch = FetchType.LAZY,orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Phones> phones = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "contacts",fetch = FetchType.LAZY,orphanRemoval = true,cascade = CascadeType.ALL)
    private List<SocialLinks> socialLinks = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "contacts",fetch = FetchType.LAZY,orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Emails> emails = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "contacts",fetch = FetchType.LAZY,orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Address> address = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "contacts",fetch = FetchType.LAZY,orphanRemoval = true,cascade = CascadeType.ALL)
    private List<Tags> tags = new ArrayList<>();

    public Contacts() {
    }


    public User getUsers() {
        return users;
    }

    public void setUsers(User users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return "Contacts{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", companyName='" + companyName + '\'' +
                ", department='" + department + '\'' +
                ", job='" + job + '\'' +
                ", birthday=" + birthday +
                ", users=" + users +
                ", phones=" + phones +
                ", socialLinks=" + socialLinks +
                ", emails=" + emails +
                ", address=" + address +
                ", tags=" + tags +
                '}';
    }
}
