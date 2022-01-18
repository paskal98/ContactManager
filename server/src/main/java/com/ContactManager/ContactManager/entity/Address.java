package com.ContactManager.ContactManager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name = "address_name")
    private String addressName;

    @Column(name = "address_link")
    private String addressLink;

    @JsonBackReference
    @ManyToOne(optional = false,cascade = CascadeType.ALL)
    private Contacts contacts;

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", addressName='" + addressName + '\'' +
                ", addressLink='" + addressLink + '\'' +
                '}';
    }
}
