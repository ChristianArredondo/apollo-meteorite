import resolutionsColl from './resolutions-coll';

export default {
  Query: {
    resolutions: () => resolutionsColl.find().fetch()
  }
};
