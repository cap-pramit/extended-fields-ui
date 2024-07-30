// This file is used to expose the components of the MFE to the host application
// Contents of this file are used in webpack config's ModuleFederationPlugin.
//
module.exports = {
  // which exposes
  // ADD MFE COMPONENT YOU WANT TO EXPORT example:
  './LoyaltyTagsList': '/app/components/pages/LoyaltyTags',
  './ExtendedFieldsList': '/app/components/pages/ExtFields',
};
