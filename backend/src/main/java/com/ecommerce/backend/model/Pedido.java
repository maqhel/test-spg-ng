/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.model;

import com.ecommerce.backend.model.PedidoDetalle;
import jakarta.persistence.Id;
import java.util.List;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;
import reactor.core.publisher.Flux;
/**
 *
 * @author LTP-T1MRW
 */
@Data
@Document(collection = "pedidos")
public class Pedido {
    @Id
    private String id;
    private Long clientId;
    private String date;
    private List<PedidoDetalle> detail;
    private double total;
}

