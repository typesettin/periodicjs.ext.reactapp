'use strict';

const periodic = require('periodicjs');
// const utilities = require('../utilities');
const controllers = require('../controllers');
const contentRouter = periodic.express.Router();
// const contentSettings = utilities.getSettings();
const oauth2serverControllers = periodic.controllers.extension.get('periodicjs.ext.oauth2server');
let ensureApiAuthenticated = oauth2serverControllers.auth.ensureApiAuthenticated;

// const assetController = resources.app.controller.native.asset;
const helperController = controllers.helper;
// const transformController = resources.app.controller.extension.reactapp.controller.transform;
// const contentdataController = resources.app.controller.extension.reactapp.controller.contentdata;

// contentRouter.use(helperController.approveOptionsRequest, ensureApiAuthenticated, helperController.fixCodeMirrorSubmit, helperController.fixFlattenedSubmit);
// contentRouter.get('/:dbname/secure-asset/:id/:filename', assetController.loadAsset, assetController.decryptAsset);

contentRouter.use(helperController.approveOptionsRequest, ensureApiAuthenticated);
contentRouter.get('/:dbname/dbstats',
  helperController.getDBStats,
  helperController.handleControllerDataResponse);
// contentRouter.get('/:dbname/:entity_type', //get index
//   transformController.pretransform,
//   contentdataController.entity_index_with_count,
//   contentdataController.entity_index_with_default_limit,
//   contentdataController.entity_index_load,
//   transformController.posttransform,
//   helperController.handleControllerDataResponse);
// contentRouter.post('/:dbname/:entity_type', //create single
//   helperController.handleFileUpload,
//   helperController.handleFileAssets,
//   helperController.fixCodeMirrorSubmit,
//   helperController.fixFlattenedSubmit,
//   helperController.handleFileAssetsResponse,
//   transformController.pretransform,
//   resources.core.controller.save_revision,
//   contentdataController.create_entity,
//   transformController.posttransform,
//   helperController.handleControllerDataResponse);
// contentRouter.get('/:dbname/:entity_type/:id', //get single
//   transformController.pretransform,
//   contentdataController.get_entity,
//   contentdataController.entity_content_pretransform,
//   transformController.posttransform,
//   helperController.handleControllerDataResponse);
// contentRouter.put('/:dbname/:entity_type/:id', //update single  
//   helperController.handleFileUpload,
//   helperController.handleFileAssets,
//   helperController.fixCodeMirrorSubmit,
//   helperController.fixFlattenedSubmit,
//   transformController.pretransform,
//   contentdataController.get_entity,
//   contentdataController.merge_controller_data_req_body,
//   contentdataController.entity_content_posttransform,
//   resources.core.controller.save_revision,
//   contentdataController.update_entity,
//   transformController.posttransform,
//   helperController.handleControllerDataResponse);
// contentRouter.delete('/:dbname/:entity_type/:id', //delete single
//   transformController.pretransform,
//   contentdataController.get_entity,
//   contentdataController.delete_entity,
//   transformController.posttransform,
//   helperController.handleControllerDataResponse);



module.exports = contentRouter;