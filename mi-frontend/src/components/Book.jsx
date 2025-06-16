import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import Modal from "./Modal";

function Book() {
  const API_URL = `http://localhost:3000/api/libros`;
  const { data: libros, loading, error, refetch } = useFetch(API_URL);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    id_autor: "",
    id_categoria: "",
    annio: "",
    descripcion: "",
    estado: "",
  });

  const openModal = () => {
    setFormData({
      nombre: "",
      id_autor: "",
      id_categoria: "",
      annio: "",
      descripcion: "",
      estado: "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      refetch(); // Refrescar la lista de libros
      closeModal();
    } catch (err) {
      console.error("Error al crear el libro:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Libros</h1>

      {/* Botón para agregar un libro */}
      <div className="mb-4">
        <button
          onClick={openModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Agregar Libro
        </button>
      </div>

      {/* Mostrar estado de carga */}
      {loading && <p className="text-gray-500">Cargando libros...</p>}

      {/* Mostrar error si ocurre */}
      {error && <p className="text-red-500">Error al cargar los libros.</p>}

      {/* Mostrar tabla de libros */}
      {!loading && !error && libros && (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">ID Autor</th>
              <th className="py-3 px-6 text-left">ID Categoría</th>
              <th className="py-3 px-6 text-left">Año</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {libros.map((libro) => (
              <tr
                key={libro.id_libro}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{libro.nombre}</td>
                <td className="py-3 px-6 text-left">{libro.id_autor}</td>
                <td className="py-3 px-6 text-left">{libro.id_categoria}</td>
                <td className="py-3 px-6 text-left">{libro.annio}</td>
                <td className="py-3 px-6 text-left">{libro.descripcion}</td>
                <td className="py-3 px-6 text-left">{libro.estado}</td>
                <td className="py-3 px-6 text-center">
                  {/* Aquí puedes agregar botones para editar o eliminar */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal para agregar un libro */}
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={closeModal}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Agregar Libro
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                ID Autor
              </label>
              <input
                type="text"
                name="id_autor"
                value={formData.id_autor}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                ID Categoría
              </label>
              <input
                type="text"
                name="id_categoria"
                value={formData.id_categoria}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Año
              </label>
              <input
                type="number"
                name="annio"
                value={formData.annio}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Estado
              </label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default Book;