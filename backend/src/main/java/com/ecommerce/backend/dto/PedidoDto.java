/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.dto;
import com.ecommerce.backend.model.Cliente;
import com.ecommerce.backend.model.Producto;
import java.util.List;

/**
 *
 * @author LTP-T1MRW
 */
public class PedidoDto {
    private String id;
    private String date;
    private double total;
    private List<PedidoDetalleDto> detail;
    private Cliente client;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public List<PedidoDetalleDto> getDetail() {
        return detail;
    }

    public void setDetail(List<PedidoDetalleDto> detail) {
        this.detail = detail;
    }

  

    public Cliente getClient() {
        return client;
    }

    public void setClient(Cliente client) {
        this.client = client;
    }

    
        
    
    
}


