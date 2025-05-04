import React, { useState, useEffect } from 'react';
import VillageCard from './villagecard'; // Asegúrate de tener este componente
import './VillageGrid.css'; // Estilos para el grid

interface VillageProps {
  id: string;
  town_name: string;
  location: string;
  description: string;
  population: number;
  imageURL: string;
  tags: string[];
}
interface VillageGridProps {
    cantidad: number;
  }
  
const VillageGrid: React.FC<VillageGridProps> = ({ cantidad }) => {
  const [pueblos, setPueblos] = useState<VillageProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPueblos = async () => {
      try {
        const response = await fetch(`http://localhost:5000/pueblos?n=${cantidad}`);
        if (!response.ok) {
          throw new Error('Error al obtener los pueblos');
        }
        const data = await response.json();
        console.log(data)
        setPueblos(data);
      } catch (err) {
        console.error("Error al obtener pueblos:", err);
        setError('No se pudieron cargar los pueblos');
        // Puedes mostrar algunos datos de demo si falla la carga
      } finally {
        setLoading(false);
      }
    };

    fetchPueblos();
  }, [cantidad]);

  if (loading) {
    return <div className="loading">Cargando pueblos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="village-grid-wrapper">
      <div className="village-grid">
        {pueblos.map((pueblo) => (
        <div key={pueblo.id} className="village-grid-item">
            <VillageCard 
            village={{
                ...pueblo,
                tags: pueblo.tags || [] // Si no hay tags, usa array vacío
            }} 
            />
        </div>
        ))}
      </div>
    </div>
  );
};

export default VillageGrid;