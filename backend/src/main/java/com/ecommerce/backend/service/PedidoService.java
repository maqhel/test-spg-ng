/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.ecommerce.backend.model.Pedido;
import com.ecommerce.backend.repository.PedidoRepository;
import java.util.function.Function;

/**
 *
 * @author LTP-T1MRW
 */
@Service
public class PedidoService {

    @Autowired(required = false)
    private PedidoRepository pedidoRepository;

    public Flux<Pedido> getAllPedidos() {
        return pedidoRepository.findAll();
    }

    public Mono<Pedido> getPedidoById(String id) {
        return pedidoRepository.findById(id);
    }

    public Mono<Pedido> createPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public Mono<Pedido> updatePedido(String id, Pedido pedidoDetails) {
        return pedidoRepository.findById(id)
                .flatMap((Pedido pedido) -> {
                    pedido.setClientId(pedidoDetails.getClientId());
                    pedido.setDetail(pedidoDetails.getDetail());
                    pedido.setDate(pedidoDetails.getDate());
                    pedido.setTotal(pedidoDetails.getTotal());
                    return pedidoRepository.save(pedido);
        });
    }

    public Mono<Void> deletePedido(String id) {
        return pedidoRepository.deleteById(id);
    }
}