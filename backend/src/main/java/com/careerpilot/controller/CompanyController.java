package com.careerpilot.controller;

import com.careerpilot.entity.Company;
import com.careerpilot.repository.CompanyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*")
public class CompanyController {

    private final CompanyRepository companyRepository;

    public CompanyController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    // GET all companies
    @GetMapping
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // GET company by id
    @GetMapping("/{id}")
    public Company getCompanyById(@PathVariable Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }

    // POST add company
    @PostMapping
    public Company createCompany(@RequestBody Company company) {
        return companyRepository.save(company);
    }

    // PUT update company
    @PutMapping("/{id}")
    public Company updateCompany(
            @PathVariable Long id,
            @RequestBody Company companyDetails) {

        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        company.setCompanyName(companyDetails.getCompanyName());
        company.setCareerUrl(companyDetails.getCareerUrl());
        company.setLogoUrl(companyDetails.getLogoUrl());

        return companyRepository.save(company);
    }

    // DELETE company
    @DeleteMapping("/{id}")
    public String deleteCompany(@PathVariable Long id) {
        companyRepository.deleteById(id);
        return "Company deleted successfully";
    }
}