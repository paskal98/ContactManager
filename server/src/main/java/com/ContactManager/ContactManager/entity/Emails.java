package com.ContactManager.ContactManager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "emails")
@Data
public class Emails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name = "email")
    private String email;

    @JsonBackReference
    @ManyToOne(optional = false,cascade = CascadeType.ALL)
    private Contacts contacts;

    @Override
    public String toString() {
        return "Emails{" +
                "id=" + id +
                ", email='" + email + '\'' +
                '}';
    }
}
