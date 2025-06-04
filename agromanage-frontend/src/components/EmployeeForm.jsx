"use client"

import { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"

export default function EmployeeForm({ employee, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    salary: "",
    hireDate: "",
    address: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        position: employee.position || "",
        department: employee.department || "",
        salary: employee.salary || "",
        hireDate: employee.hireDate || "",
        address: employee.address || "",
      })
    }
  }, [employee])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório"
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório"
    if (!formData.position.trim()) newErrors.position = "Cargo é obrigatório"
    if (!formData.department.trim()) newErrors.department = "Departamento é obrigatório"

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nome Completo *</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="(11) 99999-9999"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Data de Contratação</Form.Label>
            <Form.Control
              type="date"
              value={formData.hireDate}
              onChange={(e) => handleChange("hireDate", e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Cargo *</Form.Label>
            <Form.Control
              type="text"
              value={formData.position}
              onChange={(e) => handleChange("position", e.target.value)}
              isInvalid={!!errors.position}
              placeholder="Ex: Operador de Máquinas"
            />
            <Form.Control.Feedback type="invalid">{errors.position}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Departamento *</Form.Label>
            <Form.Select
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
              isInvalid={!!errors.department}
            >
              <option value="">Selecione um departamento</option>
              <option value="Produção">Produção</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Vendas">Vendas</option>
              <option value="Logística">Logística</option>
              <option value="Manutenção">Manutenção</option>
              <option value="Qualidade">Qualidade</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Salário</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={formData.salary}
              onChange={(e) => handleChange("salary", e.target.value)}
              placeholder="0.00"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Endereço completo"
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="success" type="submit">
          {employee ? "Atualizar" : "Adicionar"} Funcionário
        </Button>
      </div>
    </Form>
  )
}