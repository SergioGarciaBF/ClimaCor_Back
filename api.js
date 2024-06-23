import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

//Verificar os dados da lâmpada
export const getStatus = async () => {
  try {
    const response = await api.get("/tuya/status");
    return response.data;
  } catch (error) {
    console.error("Error fetching status:", error);
    throw error;
  }
};

//Ligar lâmpada
export const switchLamp = async (value) => {
  try {
    const response = await api.post(`/tuya/switch/${value}`);
    return response.data;
  } catch (error) {
    console.error("Error switching lamp:", error);
    throw error;
  }
};

//Mudar cor da lâmpada
export const changeColor = async (value) => {
  try {
    const response = await api.post(
      `/tuya/change_color/${JSON.stringify(value)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error changing color:", error);
    throw error;
  }
};

changeColor({ "h": 0, "s": 1000, "v": 1000 });