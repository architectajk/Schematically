import React, { useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState('');
  const [newTool, setNewTool] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddProject = () => {
    if (newProject.trim()) {
      setProjects([...projects, { name: newProject, tools: [] }]);
      setNewProject('');
    }
  };

  const handleAddTool = () => {
    if (newTool.trim() && selectedProject !== null) {
      const updated = [...projects];
      updated[selectedProject].tools.push(newTool);
      setProjects(updated);
      setNewTool('');
      setShowModal(false);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(projects)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'project_data.json';
    link.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        setProjects(imported);
      } catch (err) {
        alert("Invalid file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">📁 Project Dashboard</h2>

      <div className="mb-3 d-flex gap-2">
        <Form.Control
          placeholder="Enter new project name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <Button variant="primary" onClick={handleAddProject}>Add Project</Button>
        <Button variant="outline-success" onClick={handleExport}>Save Data</Button>
        <Form.Control type="file" onChange={handleImport} />
      </div>

      {projects.map((project, idx) => (
        <div key={idx} className="mb-4">
          <h5>{project.name}</h5>
          <Button size="sm" onClick={() => { setShowModal(true); setSelectedProject(idx); }}>
            ➕ Add Tool
          </Button>
          <Table striped bordered hover size="sm" className="mt-2">
            <thead>
              <tr>
                <th>#</th>
                <th>Tool Name</th>
              </tr>
            </thead>
            <tbody>
              {project.tools.map((tool, tIdx) => (
                <tr key={tIdx}>
                  <td>{tIdx + 1}</td>
                  <td>{tool}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add Tool</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Tool name"
            value={newTool}
            onChange={(e) => setNewTool(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddTool}>Add Tool</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;