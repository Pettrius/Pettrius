import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Modal, Alert, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import NavbarComponent from "../components/NavbarComponent"
import Footer from "../components/Footer"
import EmployeeForm from "../components/EmployeeForm"
import EmployeeTable from "../components/EmployeeTable"
import "../App.css"

export default function EmployeesPage() {
  const [user, setUser] = useState(null)
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("add") // 'add' or 'edit'
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)
  const [alert, setAlert] = useState({ show: false, message: "", type: "" })
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar se o usuário está logado
    const currentUser = JSON.parse(localStorage.getItem("agromanage_currentUser") || "{}")

    if (!currentUser.isLoggedIn) {
      navigate("/login")
      return
    }

    setUser(currentUser)
    loadEmployees(currentUser.id)
  }, [navigate])

  const loadEmployees = (userId) => {
    const allEmployees = JSON.parse(localStorage.getItem("agromanage_employees") || "{}")
    const userEmployees = allEmployees[userId] || []
    setEmployees(userEmployees)
  }

  const saveEmployees = (employeesList) => {
    const allEmployees = JSON.parse(localStorage.getItem("agromanage_employees") || "{}")
    allEmployees[user.id] = employeesList
    localStorage.setItem("agromanage_employees", JSON.stringify(allEmployees))
    setEmployees(employeesList)
  }

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type })
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000)
  }

  const handleAddEmployee = () => {
    setModalType("add")
    setSelectedEmployee(null)
    setShowModal(true)
  }

  const handleEditEmployee = (employee) => {
    setModalType("edit")
    setSelectedEmployee(employee)
    setShowModal(true)
  }

  const handleDeleteEmployee = (employee) => {
    setEmployeeToDelete(employee)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    const updatedEmployees = employees.filter((emp) => emp.id !== employeeToDelete.id)
    saveEmployees(updatedEmployees)
    setShowDeleteModal(false)
    setEmployeeToDelete(null)
    showAlert("Funcionário excluído com sucesso!", "success")
  }

  const handleSaveEmployee = (employeeData) => {
    let updatedEmployees

    if (modalType === "add") {
      const newEmployee = {
        id: Date.now().toString(),
        ...employeeData,
        createdAt: new Date().toISOString(),
        tableData: [], // Inicializar tabela vazia
      }
      updatedEmployees = [...employees, newEmployee]
      showAlert("Funcionário adicionado com sucesso!", "success")
    } else {
      updatedEmployees = employees.map((emp) => (emp.id === selectedEmployee.id ? { ...emp, ...employeeData } : emp))
      showAlert("Funcionário atualizado com sucesso!", "success")
    }

    saveEmployees(updatedEmployees)
    setShowModal(false)
  }

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee)
  }

  if (!user) {
    return <div className="text-center py-5">Carregando...</div>
  }

  return (
    <>
      <NavbarComponent />
      <div className="employees-page py-5">
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h1 className="employees-title">Gerenciamento de Funcionários</h1>
              <p className="text-muted">Gerencie sua equipe e acompanhe o desempenho individual</p>
            </Col>
            <Col xs="auto">
              <Button variant="success" onClick={handleAddEmployee}>
                <i className="bi bi-person-plus me-2"></i>
                Adicionar Funcionário
              </Button>
            </Col>
          </Row>

          {alert.show && (
            <Alert variant={alert.type} className="mb-4">
              {alert.message}
            </Alert>
          )}

          <Row className="g-4">
            {/* Lista de Funcionários */}
            <Col lg={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-people me-2"></i>
                    Funcionários ({employees.length})
                  </h5>
                </Card.Header>
                <Card.Body className="p-0">
                  {employees.length === 0 ? (
                    <div className="text-center py-4">
                      <i className="bi bi-person-x text-muted" style={{ fontSize: "3rem" }}></i>
                      <p className="text-muted mt-2">Nenhum funcionário cadastrado</p>
                      <Button variant="outline-success" onClick={handleAddEmployee}>
                        Adicionar Primeiro Funcionário
                      </Button>
                    </div>
                  ) : (
                    <div className="employee-list">
                      {employees.map((employee) => (
                        <div
                          key={employee.id}
                          className={`employee-item p-3 border-bottom ${
                            selectedEmployee?.id === employee.id ? "selected" : ""
                          }`}
                          onClick={() => handleSelectEmployee(employee)}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <h6 className="mb-1">{employee.name}</h6>
                              <p className="text-muted mb-1 small">{employee.position}</p>
                              <Badge bg="light" text="dark" className="small">
                                {employee.department}
                              </Badge>
                            </div>
                            <div className="employee-actions">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-1"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEditEmployee(employee)
                                }}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteEmployee(employee)
                                }}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Tabela do Funcionário Selecionado */}
            <Col lg={8}>
              {selectedEmployee ? (
                <EmployeeTable
                  employee={selectedEmployee}
                  onUpdateEmployee={(updatedEmployee) => {
                    const updatedEmployees = employees.map((emp) =>
                      emp.id === updatedEmployee.id ? updatedEmployee : emp,
                    )
                    saveEmployees(updatedEmployees)
                    setSelectedEmployee(updatedEmployee)
                  }}
                />
              ) : (
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    <div className="text-center">
                      <i className="bi bi-table text-muted" style={{ fontSize: "4rem" }}></i>
                      <h5 className="text-muted mt-3">Selecione um funcionário</h5>
                      <p className="text-muted">Escolha um funcionário da lista para visualizar e editar sua tabela</p>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Modal para Adicionar/Editar Funcionário */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "add" ? "Adicionar Funcionário" : "Editar Funcionário"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmployeeForm employee={selectedEmployee} onSave={handleSaveEmployee} onCancel={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Tem certeza que deseja excluir o funcionário <strong>{employeeToDelete?.name}</strong>?
          </p>
          <p className="text-muted small">Esta ação não pode ser desfeita e todos os dados da tabela serão perdidos.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  )
}
