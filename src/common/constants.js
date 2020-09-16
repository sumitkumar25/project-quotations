const commonConstants = {}
commonConstants.databaseName = 'project';
commonConstants.authorsCollectionName = 'authors';
commonConstants.publicationsCollectionName = 'publications';
commonConstants.usersCollectionName = 'users';
commonConstants.mongoUrl = 'mongodb://127.0.0.1:27017';

commonConstants.RESPONSE_CODE_ERROR = 400;
commonConstants.RESPONSE_CODE_SUCCESS_CREATED = 201;
commonConstants.RESPONSE_CODE_SUCCESS = 200;
commonConstants.RESPONSE_CODE_CATCH_ERROR = 500;
commonConstants.RESPONSE_CODE_CATCH_404 = 404;
commonConstants.RESPONSE_CODE_SERVICE_UNAVAILABLE = 503;
commonConstants.RESPONSE_CODE_UNAUTHORIZED = 401
commonConstants.PRIVATE_KEY = 'quotationsProjectPrivateKey';

commonConstants.AUTHENTICATED_USER = 'auth_user'
commonConstants.AUTHENTICATION_HEADER_KEY = 'Authorization';
commonConstants.AUTHENTICATION_TOKEN_KEY = "auth_token";
module.exports = commonConstants;