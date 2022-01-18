package com.ContactManager.ContactManager.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;


@Entity
@Table(name = "social_links")
@Data
public class SocialLinks {




        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name="id")
        private int id;

        @Column(name = "social_link")
        private String socialLink;

        @JsonBackReference
        @ManyToOne(optional = false,cascade = CascadeType.ALL)
        private Contacts contacts;


        @Override
        public String toString() {
                return "SocialLinks{" +
                        "id=" + id +
                        ", socialLink='" + socialLink + '\'' +
                        '}';
        }
}
