'use client'
import axios from 'axios'
import {
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Alert } from '@/components/Alerts';
import Link from 'next/link';

export default function CreteRecipes({onClose}) {
    const [categoria, setCategoria] = useState('')
    const [precio, setPrecio] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [ingredientes, setIngredientes] = useState('')
    const [alert, setAlert] = useState({})
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if ([categoria, precio, descripcion, ingredientes].includes('')) {
          setAlert({msg:"there are empty fields", error:true, isVisible:true});
          return;
        }
        const precioN= Number(precio)
        const ingredientesA= ingredientes.split(",")
        try {
          const res = await axios.post("http://127.0.0.1:8000/receta", { categoria, precioN, descripcion, ingredientesA });
          console.log(res.data);
          setAlert({msg:"Recipes created successfully", error:false, isVisible:true})
        } catch (error) {
          console.error(error);
        }
    
      };
    return (
      <Card color="transparent" shadow={false}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000,
          background: '#fff',
          border: '1px solid #ccc',
          boxShadow: '0 0 10px 2px #ccc',
          padding: '0% 40%'
        }}
  
      >
        <Typography
          className="text-2xl p-5"
        >
          CREATE RECIPES
        </Typography>
        <Alert alert={alert}/>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96  p-5" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6 ">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Categoria 
            </Typography>
            <Input
              type='text'
              placeholder=""
              className="  border-t-blue-200 focus:border-t-gray-900 "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e => setCategoria(e.target.value)}
              value={categoria}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Precio
            </Typography>
            <Input
              type='text'
              placeholder="0.00"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e => setPrecio(e.target.value)}
              value={precio}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Descripcion 
            </Typography>
            <Input
              type="text"
              placeholder=""
              className=" border-t-blue-200 focus:border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e => setDescripcion(e.target.value)}
              value={descripcion}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Ingredientes
            </Typography>
            <Input
              type="text"
              placeholder=""
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={e => setIngredientes(e.target.value)}
              value={ingredientes}
            />
          </div>
  
          <button type="submit" className="m-5 cursor-pointer">Enviar</button>
          <Link href={"/"}>Cerrar</Link>
        </form>
      </Card>
    );
}
