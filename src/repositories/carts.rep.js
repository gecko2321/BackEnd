import {dao} from "../data/dao.factory.js";
import CartsDTO from "../dto/carts.dto.js";
const { carts } = dao;
//REPOSITORIO ES LA CAPA QUE LLAMA A DAO (DAO importa la persistencia que corresponda)
//ADEMAS ES LA CAPA ENCARGADA DE TRANSFORMAR LOS OBJETOS CON LOS DTO CORRESPONDIENTES

class CartsRepository {
    constructor(manager) {
      this.model = manager;
    }
    createRepository = async (data) => {
      try {
        data = new CartsDTO(data)
        console.log(data)
        const one = await this.model.create(data);
        console.log(one)
        return one;
      } catch (error) {
        throw error;
      }
    };
    readRepository = async (role) => {
      try {
        const all = await this.model.read(role);
        return all;
      } catch (error) {
        throw error;
      }
    };
    paginateRepository = async ({ filter, options }) => {
      try {
        const all = await this.model.paginate({ filter, options });
        //console.log(all)
        return all;
      } catch (error) {
        throw error;
      }
    };
    readOneRepository = async (uid) => {
      try {
        const one = await this.model.readOne(uid);
        return one;
      } catch (error) {
        throw error;
      }
    };
    updateRepository = async (uid, data) => {
      try {
        const one = await this.model.update(uid, data);
        return one;
      } catch (error) {
        throw error;
      }
    };
    destroyRepository = async (uid) => {
      try {
        const one = await this.model.destroy(uid);
        return one;
      } catch (error) {
        throw error;
      }
    };
    destroyAllRepository = async (id) => {
      try {
        const one = await this.model.destroyAll(id);
        return one;
      } catch (error) {
        throw error;
      }
    };
  }
  
const cartsRepository = new CartsRepository(carts);
export default cartsRepository;
