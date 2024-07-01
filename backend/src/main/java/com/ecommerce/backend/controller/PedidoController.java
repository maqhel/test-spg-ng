/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.controller;

import com.ecommerce.backend.dto.PedidoDetalleDto;
import com.ecommerce.backend.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import com.ecommerce.backend.model.Pedido;
import com.ecommerce.backend.model.Cliente;
import com.ecommerce.backend.model.Producto;
import com.ecommerce.backend.dto.PedidoDto;
import com.ecommerce.backend.service.ClienteService;
import com.ecommerce.backend.service.ProductoService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import reactor.core.publisher.Mono;

/**
 *
 * @author LTP-T1MRW
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ProductoService productoService;

    @GetMapping
//    public Flux<ResponseEntity<PedidoDto>> getAllPedidos() {
//        return pedidoService.getAllPedidos().flatMap(pedido -> {
//
//            Cliente cliente = clienteService.getClienteById(pedido.getClientId());
//
//            PedidoDto pedidoDto = new PedidoDto();
//            pedidoDto.setId(pedido.getId());
//            pedidoDto.setDate(pedido.getDate());
//            pedidoDto.setTotal(pedido.getTotal());
//            pedidoDto.setClient(cliente);
//
//            return Mono.just(ResponseEntity.ok(pedidoDto));
//        });
//    }
 public Flux<PedidoDto> getAllPedidos() {
        return pedidoService.getAllPedidos()
                .flatMap(pedido -> {
                    Cliente cliente = clienteService.getClienteById(pedido.getClientId());

                    PedidoDto pedidoDto = new PedidoDto();
                    pedidoDto.setId(pedido.getId());
                    pedidoDto.setDate(pedido.getDate());
                    pedidoDto.setTotal(pedido.getTotal());
                    pedidoDto.setClient(cliente);

                    return Mono.just(pedidoDto);
                });
    }

    
    @GetMapping("/{id}")
    public Mono<ResponseEntity<PedidoDto>> getPedidoById(@PathVariable String id) {
        return pedidoService.getPedidoById(id)
                .flatMap(pedido -> {
                    Cliente clienteOpt = clienteService.getClienteById(pedido.getClientId());
                    PedidoDto pedidoDto = new PedidoDto();
                    pedidoDto.setId(pedido.getId());
                    pedidoDto.setDate(pedido.getDate());
                    pedidoDto.setTotal(pedido.getTotal());
                    pedidoDto.setClient(clienteOpt);

                    List<PedidoDetalleDto> pedidoDetalleDto = pedido.getDetail().stream()
                            .map(detail -> {
                                Producto productoOpt = productoService.getProductoById(detail.getProductId());
                                PedidoDetalleDto detalleDto = new PedidoDetalleDto();
                                detalleDto.setProduct(productoOpt);
                                detalleDto.setPrice(detail.getPrice());
                                detalleDto.setQty(detail.getQty());
                                detalleDto.setSubtotal(detail.getSubtotal());
                                return detalleDto;
                            })
                            .collect(Collectors.toList());
                    pedidoDto.setDetail(pedidoDetalleDto);

                    return Mono.just(ResponseEntity.ok(pedidoDto));
                })
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<Pedido> createPedido(@RequestBody Pedido pedido) {
        return pedidoService.createPedido(pedido);
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Pedido>> updatePedido(@PathVariable String id, @RequestBody Pedido pedidoDetails) {
        return pedidoService.updatePedido(id, pedidoDetails)
                .map(updatedPedido -> ResponseEntity.ok(updatedPedido))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deletePedido(@PathVariable String id) {
        return pedidoService.deletePedido(id)
                .then(Mono.just(ResponseEntity.noContent().build()));
    }
}
