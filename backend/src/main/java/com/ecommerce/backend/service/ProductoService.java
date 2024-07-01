/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Producto;
import com.ecommerce.backend.repository.ProductoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author LTP-T1MRW
 */
@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    public List<Producto> getAllProductos() {
        return productoRepository.findAllActive();
    }

    public Producto getProductoById(Long id) {
        return productoRepository.findByIdActive(id);
    }

    public Producto createProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto updateProducto(Long id, Producto productoDetails) {
        Producto producto = productoRepository.findByIdActive(id);
        
        if (producto != null) {
            
            if (productoDetails.getTitle() != null && !productoDetails.getTitle().isEmpty()) {
                producto.setTitle(productoDetails.getTitle());
            }
            if (productoDetails.getDescription() != null && !productoDetails.getDescription().isEmpty()) {
                producto.setDescription(productoDetails.getDescription());
            }
            if (productoDetails.getImage() != null && !productoDetails.getImage().isEmpty()) {
                producto.setImage(productoDetails.getImage());
            }
            
             if (productoDetails.getPrice() > 0d) {
                  producto.setPrice(productoDetails.getPrice());
             }
            

            return productoRepository.save(producto);
        }
        return null;
    }

    public boolean deleteProducto(Long id) {

        Producto producto = productoRepository.findByIdActive(id);
        if (producto != null) {
            productoRepository.deactivateById(id);
            return true;
        }
        return false;
    }
}
