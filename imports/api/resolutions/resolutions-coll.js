import { Mongo } from 'meteor/mongo';

const resolutionsColl = new Mongo.Collection('resolutions');

export default resolutionsColl;
