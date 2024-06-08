class Service {
  constructor(manager) {
    this.model = manager;
  }
  createService = async (data) => {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readService = async (role) => {
    try {
      const all = await this.model.read(role);
      return all;
    } catch (error) {
      throw error;
    }
  };
  paginateService = async ({ filter, options }) => {
    try {
      const all = await this.model.paginate({ filter, options });
      return all;
    } catch (error) {
      throw error;
    }
  };
  readOneService = async (uid) => {
    try {
      const one = await this.model.readOne(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateService = async (uid, data) => {
    try {
      const one = await this.model.update(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  destroyService = async (uid) => {
    try {
      const one = await this.model.destroy(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  destroyAllService = async (user_id) => {
    try {
      const one = await this.model.destroyAll(user_id);
      return one;
    } catch (error) {
      throw error;
    }
  };
}

export default Service;
