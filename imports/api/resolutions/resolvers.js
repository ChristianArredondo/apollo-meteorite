import resolutionsColl from './resolutions-coll';

export default {
  Query: {
    resolutions: (obj, args, { user }) => {
      return resolutionsColl.find({ userId: user ? user._id : null }).fetch();
    }
  },

  Mutation: {
    createResolution: (obj, { name }, { user }) => {
      const resolutionId = resolutionsColl.insert({ name, userId: user._id });
      return resolutionsColl.findOne(resolutionId);
    }
  }
};
