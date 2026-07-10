package com.careerpilot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "career_url")
    private String careerUrl;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "active")
    private Boolean active = true;


    // Default constructor
    public Company() {
    }


    // Constructor
    public Company(String companyName, String careerUrl, String logoUrl, Boolean active) {
        this.companyName = companyName;
        this.careerUrl = careerUrl;
        this.logoUrl = logoUrl;
        this.active = active;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }


    public String getCareerUrl() {
        return careerUrl;
    }

    public void setCareerUrl(String careerUrl) {
        this.careerUrl = careerUrl;
    }


    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }


    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }


    @Override
    public String toString() {
        return "Company{" +
                "id=" + id +
                ", companyName='" + companyName + '\'' +
                ", careerUrl='" + careerUrl + '\'' +
                ", logoUrl='" + logoUrl + '\'' +
                ", active=" + active +
                '}';
    }
}