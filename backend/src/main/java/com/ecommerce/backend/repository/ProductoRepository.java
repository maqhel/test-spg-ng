/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.repository;
import com.ecommerce.backend.model.Producto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author LTP-T1MRW
 */
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    @Query(value = "SELECT * FROM producto where is_active is true", nativeQuery = true)
    List<Producto> findAllActive();
    
    @Query(value = "SELECT * FROM producto WHERE is_active = true AND id = :id", nativeQuery = true)
    Producto findByIdActive(Long id);
   
    @Query(value = "UPDATE producto SET is_active = false WHERE id = :id RETURNING id", nativeQuery = true)
    Long deactivateById( @Param("id") Long id);
}
