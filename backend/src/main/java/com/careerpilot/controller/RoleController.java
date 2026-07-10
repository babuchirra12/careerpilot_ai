package com.careerpilot.controller;

import com.careerpilot.entity.Role;
import com.careerpilot.repository.RoleRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "*")
public class RoleController {

    private final RoleRepository roleRepository;


    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }


    // Get all roles
    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {

        List<Role> roles = roleRepository.findAll();

        return ResponseEntity.ok(roles);
    }


    // Get role by ID
    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(
            @PathVariable Long id) {

        Role role = roleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Role not found: " + id)
                );

        return ResponseEntity.ok(role);
    }


    // Create role
    @PostMapping
    public ResponseEntity<Role> createRole(
            @RequestBody Role role) {

        Role savedRole = roleRepository.save(role);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedRole);
    }


    // Update role
    @PutMapping("/{id}")
    public ResponseEntity<Role> updateRole(
            @PathVariable Long id,
            @RequestBody Role roleDetails) {


        Role existingRole = roleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Role not found: " + id)
                );


        existingRole.setName(roleDetails.getName());


        Role updatedRole = roleRepository.save(existingRole);

        return ResponseEntity.ok(updatedRole);
    }


    // Delete role
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRole(
            @PathVariable Long id) {

        roleRepository.deleteById(id);

        return ResponseEntity.ok(
                "Role deleted successfully"
        );
    }
}