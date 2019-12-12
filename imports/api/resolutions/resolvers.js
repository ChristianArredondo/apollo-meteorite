import resolutionsColl from './resolutions-coll';

export default {
  Query: {
    resolutions: () => resolutionsColl.find().fetch()
  },

  Mutation: {
    createResolution: (obj, { name }, context) => {
      const resolutionId = resolutionsColl.insert({ name });
      return resolutionsColl.findOne(resolutionId);
    }
  }
};
