const canCreate = async (req, reply) => {
  if (!req.currentUser.isSuperAdmin()) {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
};

// for (let i = 0; i < 12; i++) {
//   console.log(i);
// }

export default canCreate;
