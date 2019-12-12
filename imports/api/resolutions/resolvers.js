import resolutionsColl from './resolutions-coll';

export default {
  Query: {
    resolutions: (obj, args, { user }) => {
      if (user) {
        return resolutionsColl.find({ userId: user._id }).fetch();
      }

      return [];
    }
  },

  Mutation: {
    createResolution: (obj, { name }, { user }) => {
      const resolutionId = resolutionsColl.insert({ name, userId: user._id });
      return resolutionsColl.findOne(resolutionId);
    }
  }
};
