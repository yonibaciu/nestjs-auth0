import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const apiUrl = import.meta.env.VITE_API_URL;

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently();
      console.log(accessToken);

      fetch(`${apiUrl}/items`, {
        headers: { Authorization: "Bearer " + accessToken },
      })
        .then((response) => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
        .then((data) => setMenu(data));
    })();
  }, []);

  return <>{JSON.stringify(menu)}</>;
};

export default Menu;
