import httpServece from "./http.service";

const qualityEndPoint = "quality/";

const qualityService = {
    get: async () => {
        const req = await httpServece.get(qualityEndPoint);
        return req.data;
    }
};

export default qualityService;
