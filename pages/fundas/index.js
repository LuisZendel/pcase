import Navbar from "../../components/navbar/Navbar";
import PhoneCase from "../../components/navbar/products/phonecase";
import { useEffect, useState } from "react";
export default function Home() {
  const [fundas, setFundas] = useState([]);
  const [shopping, setShopping] = useState([]);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3003/funda")
      .then((data) => data.json())
      .then((data) => {
        setFundas(data);
        console.log(data);
      });
  }, []);

  const addShoping = (e) => {
    var productoAdd = e;
    var aux = shopping.find((x) => x._id == productoAdd._id);
    if (!aux) {
      var toAdd = [...shopping, productoAdd];
      setShopping(toAdd);
      setContador(contador+1)
    }
    console.log(contador)
    console.log(shopping)
  }
  return (
    <div className="bg-white w-screen ">
      <Navbar contador={contador} shopping={shopping} setShopping={setShopping} setContador={setContador} />
      <br />
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 mx-3 gap-3">
        {fundas.map((e, index) => {
          return (
            <PhoneCase
              image={`/${e.imagen[0]}`}
              price={e.costo}
              e={e}
              description={e.descripcion}
              nombre={e.nombre}
              key={index}
              addCar = {addShoping}
            />
          );
        })}
      </div>
    </div>
  );
}
