const preDate = (schema) => {
  /**
   * update updatedAt on changes
   */
  schema.pre('save', async function (next) {
    this.updatedAt = Date.now();
    next();
  });
};

module.exports = preDate;
