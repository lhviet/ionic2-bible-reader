
function downloadDatabase($q, $cordovaFile, localDb, databaseLocation, bibleObj, url){
  var dfd = $q.defer();
  downloadFile($q, bibleObj.filename, url)
    .then(function(zipFileUrl){
      if (zipFileUrl){
        unzipDatabase($q,$cordovaFile,databaseLocation,zipFileUrl,bibleObj)
          .then(function(isDatabaseCopy){
            if (isDatabaseCopy){
              var query = "REPLACE INTO bibles (bible_code) VALUES (?)";
              localDb.executeSql(query, [bibleObj.code], function (result) {
                console.log("Extracted Database successfully = " + bibleObj.code);
                dfd.resolve(bibleObj.code);
              }, function(error) {
                console.error('Insert available BIBLE into LocalDB error = '+JSON.stringify(error));
                // deleting the copied database file
                $cordovaFile.removeFile(cordova.file.dataDirectory, bibleObj.dbFileName)
                  .then(function(removeResult){
                    console.log('just copied database file removed = '+JSON.stringify(removeResult));
                  },function(removeResult){
                    console.error('just copied database file removing error = '+JSON.stringify(removeResult));
                  });
                dfd.resolve(false);
              });
            }else{
              console.error('Unzip & Copy BIBLE error = '+zipFileUrl);
              dfd.resolve(false);
            }
          });
      }else{
        dfd.resolve(false);
      }
    });
  return dfd.promise;
}
function downloadFile($q, filename, url){
  var dfd = $q.defer();
  var fileTransfer = new FileTransfer();
  fileTransfer.download(
    url,
    cordova.file.dataDirectory+filename,
    function(entry) {
      console.log("downloaded file = " + entry.toURL());
      dfd.resolve(entry.toURL());
    },
    function(error) {
      console.error("download error = " + JSON.stringify(error));
      dfd.resolve(false);
    },
    false,
    {
      headers: {
        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
      }
    }
  );
  return dfd.promise;
}
function unzipDatabase($q,$cordovaFile,databaseLocation,zipFileUrl,bibleObj){
  var dfd = $q.defer();
  zip.unzip(  // unzip the database & deleting the copied zip file
    zipFileUrl,
    databaseLocation,
    function (result) {
      // deleting the zip file
      $cordovaFile.removeFile(cordova.file.dataDirectory, bibleObj.filename)
        .then(function(removeResult){
          console.log('zip removed = '+JSON.stringify(removeResult));
        },function(removeResult){
          console.error('zip removed error = '+JSON.stringify(removeResult));
        });
      if (result > -1) {
        dfd.resolve(true);
      }else{
        console.error('unzip unsuccessfully !!!');
        console.error('from = '+zipFileUrl);
        console.error('to = '+databaseLocation);
        dfd.resolve(false);
      }
    });
  return dfd.promise;
}
