const canCreateBooks = async (req, reply) => {
  if (!req.currentUser.isSuperAdmin()) {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
};

export default canCreateBooks;
