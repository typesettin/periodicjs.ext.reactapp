'use strict';

function getDatasFromMap(dataMapArray) {
  return {
    modelName: dataMapArray[0],
    data: dataMapArray[1],
  };
}

function getRecentData(options) {
  const { data, modelName, } = options;
  return new Promise((resolve, reject) => {
    try {
      data.search({ limit: 5, paginate: true, query: {}, })
        .then(resultData => {
          const returnData = resultData[0].documents.map(resultDoc => {
            resultDoc.modelName = modelName;
            resultDoc.collectionCount = resultData.collection_count;
            return resultDoc;
          });
          resolve({
            docs: returnData || [],
            modelData: {
              modelName,
              name: modelName,
              collection: modelName,
              collectionCount: resultData.collection_count,
              count: resultData.collection_count,
            },
          });
        })
        .catch(reject);
    } catch (e) {
      reject(e);
    }
  });
}
module.exports = {
  getDatasFromMap,
  getRecentData,
};