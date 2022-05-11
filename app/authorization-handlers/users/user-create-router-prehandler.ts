import UserPolicy from '../../policies/user.policy';

const canCreate = async (req, reply) => {
  const policy = new UserPolicy(req.currentUser);
  if (!policy.canCreate) {
    reply
      .code(403)
      .send({ errors: ['You are not allowed to perform this action'] });
  }
};

// for (let i = 0; i < 12; i++) {
//   console.log(i);
// }

export default canCreate;
