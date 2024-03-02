import { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/items`)
    .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data => setMenu(data))
  },[]);

  return (
    <>
      {JSON.stringify(menu)}
    </>
  )
}

export default Menu;