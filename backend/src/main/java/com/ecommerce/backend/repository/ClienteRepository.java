/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.backend.model.Cliente;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
/**
 *
 * @author LTP-T1MRW
 */
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    @Query(value = "SELECT * FROM cliente where is_active is true", nativeQuery = true)
    List<Cliente> findAllActive();
    
    @Query(value = "SELECT * FROM cliente WHERE is_active = true AND id = :id", nativeQuery = true)
    Cliente findByIdActive(Long id);
   
    @Query(value = "UPDATE cliente SET is_active = false WHERE id = :id RETURNING id", nativeQuery = true)
    Long deactivateById( @Param("id") Long id);
  
}
