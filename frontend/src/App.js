import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [persons, setPersons] = useState([]);
  const [form, setForm] = useState({ name: '', profession: '', email: '', file: null, id: null });

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    const res = await axios.get('http://localhost:5000/api/persons');
    setPersons(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('profession', form.profession);
    formData.append('email', form.email);
    if (form.file) formData.append('picture', form.file);

    if (form.id) {
      await axios.put(`http://localhost:5000/api/persons/${form.id}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/persons', formData);
    }

    setForm({ name: '', profession: '', email: '', file: null, id: null });
    fetchPersons();
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, profession: p.profession, email: p.email, id: p._id, file: null });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Person Manager</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Profession" value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })} required />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="file" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} accept="image/*" />
        <button type="submit">{form.id ? 'Update' : 'Create'}</button>
      </form>
      <hr />
      <div>
        {persons.map(p => (
          <div key={p._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            {p.picture && <img src={`http://localhost:5000/${p.picture}`} alt={p.name} width={100} />}
            <h3>{p.name}</h3>
            <p>{p.profession}</p>
            <p>{p.email}</p>
            <button onClick={() => handleEdit(p)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;