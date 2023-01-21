import httpServece from "./http.service";

const professionEndPoint = "profession/";

const proffesionService = {
    get: async () => {
        const { data } = await httpServece.get(professionEndPoint);
        return data;
    }
};

export default proffesionService;
