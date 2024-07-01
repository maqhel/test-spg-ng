/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.controller;

import com.ecommerce.backend.service.ClienteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecommerce.backend.model.Cliente;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author LTP-T1MRW
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteService.getAllClientes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClienteById(@PathVariable Long id) {
        Cliente cliente = clienteService.getClienteById(id);
        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        }

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Cliente no encontrdado con ID: " + id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);

    }

    @PostMapping
    public ResponseEntity<?> createCliente(@Valid @RequestBody Cliente cliente, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errores);
        }

        Cliente nuevoCliente = clienteService.createCliente(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCliente);
    }

//    @PostMapping
//    public Cliente createCliente(@RequestBody Cliente cliente) {
//        return clienteService.createCliente(cliente);
//    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCliente(@PathVariable Long id, @Valid @RequestBody Cliente clienteDetails, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errores);
        }

        Cliente updatedCliente = clienteService.updateCliente(id, clienteDetails);
        if (updatedCliente != null) {
            return ResponseEntity.ok(updatedCliente);
        }

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Cliente no encontrdado con ID: " + id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCliente(@PathVariable Long id) {
        boolean isDeleted = clienteService.deleteCliente(id);
        if (!isDeleted) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Cliente no encontrado con ID: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        return ResponseEntity.noContent().build();
    }
}
