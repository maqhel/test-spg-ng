/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 *
 * @author LTP-T1MRW
 */

@Data
@Entity
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El nombre es obligatorio")
    private String title;
    
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor que 0")
    private double price;
    
    private String image;
      
    private String description;
    
    @Column(columnDefinition = "boolean default true")
    @JsonIgnore
    private Boolean is_active=true;
    
    @PrePersist
    protected void onCreate() {
        if (image == null || image.isEmpty()) {
            image = "https://picsum.photos/200";
        }
        if (is_active == null) {
            is_active = false;
        }
    }
    
}