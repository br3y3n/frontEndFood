"use client"
import axios from 'axios'
import Image from "next/image";
import Link from "next/link";
import { useEffect,useState } from "react";
export default function Home() {
  const [recipes, setRecipes] = useState(null)
  const consumo = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/recetas')
      const data = response.data;
      setRecipes(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    consumo();
  }, []);
  return (
    
       <main className='p-10'>
        <h1 className='text-lg mb-20'>MI LISTA DE ALIMENTOS</h1>
        
        <Link className="bg-green-500 w-36 rounded-md text-white p-3"  href={"/createRecipes"}>Agregar Receta</Link>
        <table className='border-collapse w-full mt-10'>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Ingredientes</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
         { recipes && recipes.map(({_id:{$oid: id}, categoria, precio, descripcion, ingredientes}) => {
          return <tbody>
            <tr className='text-center rounded-sm' key={id}>
              <td className='p-5 border'>{categoria}</td>
              <td className=' border'>{precio}</td>
              <td className='border'>{descripcion}</td>
              <td className='border'>{`${ingredientes} `}</td>
              <td className='border'>
                 <Link className='bg-blue-500 p-3 rounded-md text-white' href={`/updateRecipes/${id}`}>Editar</Link>
                 </td>
                 <td className='border'>
                 <Link className='bg-yellow-500 p-3 rounded-md text-white' href={""} >Borrar</Link>
                 </td>
            </tr>
          </tbody>
          })}
        </table>    
      </main>
  );
}
