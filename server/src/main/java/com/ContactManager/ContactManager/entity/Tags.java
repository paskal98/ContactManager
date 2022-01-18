package com.ContactManager.ContactManager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name = "tags")
@Data
public class Tags {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name = "tag")
    private String tag;

    @Column(name = "color")
    private String color;

    @JsonBackReference
    @ManyToOne(optional = false,cascade = CascadeType.ALL)
    private Contacts contacts;

    @Override
    public String toString() {
        return "Tags{" +
                "id=" + id +
                ", tag='" + tag + '\'' +
                ", color='" + color + '\'' +
                '}';
    }
}
