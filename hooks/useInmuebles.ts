import { useEffect, useState } from "react";
import { getInmuebles } from "../services/inmuebleService";
import { Inmueble } from "../interfaces/Inmueble.interface";

export function useInmuebles() {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInmuebles = async () => {
      try {
        const inmuebles = await getInmuebles();
        setInmuebles(inmuebles);
      } catch (error) {
        console.error('Error cargando los inmuebles', error);
      } finally {
        setLoading(false);
      }
    };

    loadInmuebles();
  }, []);

  return { inmuebles, loading, setInmuebles };
}