/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.ecommerce.backend.service;

import com.ecommerce.backend.repository.ClienteRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecommerce.backend.model.Cliente;
import jakarta.transaction.Transactional;

/**
 *
 * @author LTP-T1MRW
 */
@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> getAllClientes() {
        return clienteRepository.findAllActive();
    }
    
    public Cliente getClienteById(Long id) {
        return clienteRepository.findByIdActive(id);
    }

    public Cliente createCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente updateCliente(Long id, Cliente clienteDetails) {
        Cliente cliente = clienteRepository.findByIdActive(id);
        if (cliente != null) {

            if (clienteDetails.getFull_name()!= null) {
                cliente.setFull_name(clienteDetails.getFull_name());
            }
            
              if (clienteDetails.getLast_name()!= null) {
                cliente.setLast_name(clienteDetails.getLast_name());
            }
              
            if (clienteDetails.getPhone()!= null) {
                cliente.setPhone(clienteDetails.getPhone());
            }
            
            if (clienteDetails.getEmail() != null) {
                cliente.setEmail(clienteDetails.getEmail());
            }
            return clienteRepository.save(cliente);
        }
        return null;
    }

    public boolean deleteCliente(Long id) {
        Cliente cliente = clienteRepository.findByIdActive(id);
        if (cliente != null) { 
            clienteRepository.deactivateById(id);
            return true;
        }
        return false;
    }
}