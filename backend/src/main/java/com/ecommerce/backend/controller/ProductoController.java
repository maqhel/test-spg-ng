/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.controller;

import com.ecommerce.backend.model.Cliente;
import com.ecommerce.backend.service.ProductoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecommerce.backend.model.Producto;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author LTP-T1MRW
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public List<Producto> getAllProductos() {
        return productoService.getAllProductos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductoById(@PathVariable Long id) {
        Producto producto = productoService.getProductoById(id);
        if (producto != null) {
            return ResponseEntity.ok(producto);
        }
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Producto no encontrdado con ID: " + id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);

    }

//    @PostMapping
//    public Producto createProducto(@RequestBody Producto producto) {
//        return productoService.createProducto(producto);
//    }
    @PostMapping
    public ResponseEntity<?> createProducto(@Valid @RequestBody Producto producto, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errores);
        }

        Producto nuevoProducto = productoService.createProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoProducto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProducto(@PathVariable Long id,  @RequestBody Producto productoDetails, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errores.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errores);
        }

        Producto updatedProducto = productoService.updateProducto(id, productoDetails);
        if (updatedProducto != null) {
            return ResponseEntity.ok(updatedProducto);
        }

        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Producto no encontrdado con ID: " + id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProducto(@PathVariable Long id) {
        boolean isDeleted = productoService.deleteProducto(id);
        if (!isDeleted) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Producto no encontrado con ID: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        return ResponseEntity.noContent().build();

    }
}
