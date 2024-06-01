class Manager {
  constructor(Model) {
    this.Model = Model;
  }
  async create(data) {
    try {
      const one = await this.Model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read(opts) {
    try {
      let query = {};
        if (opts && opts.category) {
            // Si se proporciona la categoría en opts, agregarla a la consulta
            query = { category: opts.category };
        }
      const all = await this.Model.find(query).lean();
      return all;
    } catch (error) {
      throw error;
    }
  }
  // async readByCat(category) {
  //   try {
  //     const all = await this.Model.find(category).lean();
  //     return all;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async readOne(id) {
    try {
      const one = await this.Model.findOne({_id:id}).lean()
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readByEmail(email) {
    try {
      const one = await this.Model.findOne({ email }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async paginate({filter,options}) {
    try {
      options = {...options,lean:true}
      const all = await this.Model.paginate(filter,options);
      if (all.totalDocs ===0){
        const error = new Error("No hay Documentos")
        error.statusCode = 404
        throw error
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const one = await this.Model.findByIdAndUpdate(id, data, {
        new: true,
      }).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.Model.findByIdAndDelete(id).lean();
      return one;
    } catch (error) {
      throw error;
    }
  }
  async aggregate(obj) {
    try {
      const result = await this.Model.aggregate(obj);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default Manager;
