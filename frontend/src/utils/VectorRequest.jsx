
import axios from "axios";
import { vectorEmbeddingUrl } from "./config";

const vectorRequest = axios.create({
    baseURL: vectorEmbeddingUrl,
    withCredentials: true,

});

export default vectorRequest;