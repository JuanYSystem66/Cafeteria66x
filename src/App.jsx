import React, { useState } from 'react';

// 1. Componente CoffeeCard
const CoffeeCard = ({ name, quantity, onOrder }) => {
  return (
    // Aplicando Tailwind: bordes, padding, colores de fondo y flexbox
    <div className="border border-amber-200 bg-amber-50 p-6 rounded-xl shadow-sm flex flex-col items-center justify-between gap-4 w-64">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-900">{name}</h2>
        <p className="text-gray-600 mt-1">
          Cantidad: <span className="font-semibold text-lg">{quantity}</span>
        </p>
      </div>
      
      {/* Botón "Pedir" */}
      <button 
        onClick={onOrder}
        className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex justify-center items-center"
      >
        Pedir
      </button>
    </div>
  );
};

// 2. Componente Principal (App)
export default function App() {
  // Estado inicial con una lista de al menos 3 cafés (id, nombre, cantidad)
  const [coffees, setCoffees] = useState([
    { id: 1, name: "Capuchino", quantity: 0 },
    { id: 2, name: "Espresso", quantity: 0 },
    { id: 3, name: "Latte", quantity: 0 },
    { id: 4, name: "Mocha", quantity: 0 }
  ]);

  // Función para incrementar el contador de un café específico
  const handleOrder = (id) => {
    const updatedCoffees = coffees.map(coffee => {
      if (coffee.id === id) {
        return { ...coffee, quantity: coffee.quantity + 1 };
      }
      return coffee;
    });
    setCoffees(updatedCoffees);
  };

  // Calcular el total de cafés pedidos sumando todas las cantidades
  const totalOrders = coffees.reduce((total, coffee) => total + coffee.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
      
      {/* Mostrar en la parte superior el "Total de cafés pedidos" */}
      <div className="bg-white px-8 py-4 rounded-2xl shadow-md border border-gray-200 mb-10 text-center">
        <h1 className="text-xl text-gray-500 font-medium uppercase tracking-wide">
          Total de cafés pedidos
        </h1>
        <p className="text-5xl font-extrabold text-amber-600 mt-2">
          {totalOrders}
        </p>
      </div>

      {/* Renderizar la lista de componentes CoffeeCard iterando sobre el estado */}
      <div className="flex flex-wrap gap-6 justify-center max-w-4xl">
        {coffees.map((coffee) => (
          <CoffeeCard 
            key={coffee.id} 
            name={coffee.name} 
            quantity={coffee.quantity} 
            // Pasamos la función ejecutando el ID correspondiente
            onOrder={() => handleOrder(coffee.id)} 
          />
        ))}
      </div>
      
    </div>
  );
}