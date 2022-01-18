package com.ContactManager.ContactManager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "phones")
@Data
public class Phones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name = "phone")
    private String phone;

    @JsonBackReference
    @ManyToOne(optional = false,cascade = CascadeType.ALL)
    private Contacts contacts;

    @Override
    public String toString() {
        return "Phones{" +
                "id=" + id +
                ", phone='" + phone + '\'' +
                '}';
    }
}
