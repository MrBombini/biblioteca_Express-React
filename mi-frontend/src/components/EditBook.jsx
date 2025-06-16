import React, { useState } from "react";

function EditBook({ libro, onClose, onSuccess }) {
  const API_URL = `http://localhost:3000/api/book/${libro.id_libro}`;
  const [formData, setFormData] = useState({ ...libro });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      onSuccess();
    } catch (err) {
      console.error("Error al editar el libro:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Editar Libro</h2>
      <div>
        <label className="block text-sm font-medium text-gray-600">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      {/* Otros campos */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Guardar
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
      >
        Cancelar
      </button>
    </form>
  );
}

export default EditBook;