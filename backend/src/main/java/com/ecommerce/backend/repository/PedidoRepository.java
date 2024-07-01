/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.repository;
import com.ecommerce.backend.model.Pedido;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

/**
 *
 * @author LTP-T1MRW
 */
public interface PedidoRepository extends ReactiveMongoRepository<Pedido, String> {
}