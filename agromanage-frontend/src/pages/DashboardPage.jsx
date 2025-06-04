"use client"

import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import NavbarComponent from "../components/NavbarComponent"
import Footer from "../components/Footer"
import "../App.css"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    employees: 0,
    totalRecords: 0,
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar se o usuário está logado
    const currentUser = JSON.parse(localStorage.getItem("agromanage_currentUser") || "{}")

    if (!currentUser.isLoggedIn) {
      navigate("/login")
      return
    }

    setUser(currentUser)
    loadStats(currentUser.id)
  }, [navigate])

  const loadStats = (userId) => {
    const allEmployees = JSON.parse(localStorage.getItem("agromanage_employees") || "{}")
    const userEmployees = allEmployees[userId] || []

    const totalRecords = userEmployees.reduce((total, employee) => {
      return total + (employee.tableData ? employee.tableData.length : 0)
    }, 0)

    setStats({
      employees: userEmployees.length,
      totalRecords,
    })
  }

  const handleLogout = () => {
    // Remover usuário atual do localStorage
    localStorage.removeItem("agromanage_currentUser")
    navigate("/login")
  }

  if (!user) {
    return <div className="text-center py-5">Carregando...</div>
  }

  return (
    <>
      <NavbarComponent />
      <div className="dashboard-page py-5">
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h1 className="dashboard-welcome">Bem-vindo, {user.name}!</h1>
              <p className="text-muted">Gerencie sua produção agrícola com eficiência</p>
            </Col>
            <Col xs="auto">
              <Button variant="outline-danger" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i>
                Sair
              </Button>
            </Col>
          </Row>

          {/* Cards de Estatísticas */}
          <Row className="g-4 mb-5">
            <Col md={3}>
              <Card className="dashboard-stat-card border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="text-success mb-2">
                    <i className="bi bi-people" style={{ fontSize: "2rem" }}></i>
                  </div>
                  <h3 className="text-success">{stats.employees}</h3>
                  <p className="text-muted mb-0">Funcionários</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-stat-card border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="text-success mb-2">
                    <i className="bi bi-table" style={{ fontSize: "2rem" }}></i>
                  </div>
                  <h3 className="text-success">{stats.totalRecords}</h3>
                  <p className="text-muted mb-0">Registros</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-stat-card border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="text-success mb-2">
                    <i className="bi bi-flower2" style={{ fontSize: "2rem" }}></i>
                  </div>
                  <h3 className="text-success">0</h3>
                  <p className="text-muted mb-0">Lavouras</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-stat-card border-0 shadow-sm">
                <Card.Body className="text-center">
                  <div className="text-success mb-2">
                    <i className="bi bi-cash-coin" style={{ fontSize: "2rem" }}></i>
                  </div>
                  <h3 className="text-success">R$ 0</h3>
                  <p className="text-muted mb-0">Receita</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            <Col md={4}>
              <Card className="dashboard-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-success mb-3">
                    <i className="bi bi-people" style={{ fontSize: "2rem" }}></i>
                  </div>
                  <Card.Title>Funcionários</Card.Title>
                  <Card.Text>Gerencie sua equipe e acompanhe o desempenho individual de cada funcionário.</Card.Text>
                  <Button as={Link} to="/funcionarios" variant="success" className="mt-2">
                    Gerenciar Funcionários
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="dashboard-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-success mb-3">
                    <i className="bi bi-flower2" style={{ fontSize: "2rem" }}></i>
                  </div>
                  <Card.Title>Minhas Lavouras</Card.Title>
                  <Card.Text>Gerencie suas plantações e acompanhe o desenvolvimento de cada cultura.</Card.Text>
                  <Button variant="success" className="mt-2" disabled>
                    Gerenciar Lavouras
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="dashboard-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-success mb-3">
                    <i className="bi bi-cash-coin" style={{ fontSize: "2rem" }}></i>
                  </div>
                  <Card.Title>Finanças</Card.Title>
                  <Card.Text>
                    Controle receitas, despesas e acompanhe o desempenho financeiro da sua produção.
                  </Card.Text>
                  <Button variant="success" className="mt-2" disabled>
                    Ver Finanças
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Card.Title>Atividades Recentes</Card.Title>
                  <p className="text-muted">
                    {stats.employees > 0
                      ? `Você tem ${stats.employees} funcionário(s) cadastrado(s) com ${stats.totalRecords} registro(s) de atividades.`
                      : "Você ainda não tem funcionários cadastrados. Comece adicionando sua equipe."}
                  </p>
                  <Button as={Link} to="/funcionarios" variant="outline-success">
                    <i className="bi bi-people me-2"></i>
                    {stats.employees > 0 ? "Ver Funcionários" : "Adicionar Funcionários"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
}
