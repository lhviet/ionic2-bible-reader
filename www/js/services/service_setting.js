app.factory('settingService',function($q,$cordovaFile,$ionicModal,$ionicPopover,$ionicLoading,bibleService){
  var modal_notification = false;
  var popover_history = false;
  return {
    fontSize: defaultFontSize,
    availableBibles: [],
    primary_bible: false,
    secondary_bible: false,
    speakingSpeed: defaultSpeakingSpeed,
    isDualBible: true,
    dbLocation: 0,
    databasePath: '',
    initDb: function(){
      var dfd = $q.defer();
      var _this = this;
      var countQuery = 0;
      localDb = window.sqlitePlugin.openDatabase({name: "LOCAL_DB.SQLite3", location: _this.dbLocation},
        function(){
          // create table for storing highlights
          var query1 = "CREATE TABLE IF NOT EXISTS bibles (bible_code TEXT PRIMARY KEY);";
          localDb.executeSql(query1,[],function(result) {
            countQuery++;
            if (countQuery==5) dfd.resolve(true);
          }, function(error) {
            console.error('CREATE bibles table error = '+JSON.stringify(error));
            dfd.resolve(false);
          });
          var query2 = "CREATE TABLE IF NOT EXISTS highlight (book INTEGER NOT NULL, chapter INTEGER NOT NULL, verse INTEGER NOT NULL, createdAt DATE DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(book,chapter,verse));";
          localDb.executeSql(query2,[],function(result) {
            countQuery++;
            if (countQuery==5) dfd.resolve(true);
          }, function(error) {
            console.error('CREATE highlight table error = '+JSON.stringify(error));
            dfd.resolve(false);
          });
          var query3 = "CREATE TABLE IF NOT EXISTS configuration (key TEXT PRIMARY KEY, value TEXT NOT NULL);";
          localDb.executeSql(query3,[],function(result) {
            countQuery++;
            if (countQuery==5) dfd.resolve(true);
          }, function(error) {
            console.error('CREATE configuration table error = '+JSON.stringify(error));
            dfd.resolve(false);
          });
          var query4 = "CREATE TABLE IF NOT EXISTS bookmark (book INTEGER NOT NULL, chapter INTEGER NOT NULL, createdAt DATE DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(book,chapter));";
          localDb.executeSql(query4,[],function(result) {
            countQuery++;
            if (countQuery==5) dfd.resolve(true);
          }, function(error) {
            console.error('CREATE bookmark table error = '+JSON.stringify(error));
            dfd.resolve(false);
          });
          var query5 = "CREATE TABLE IF NOT EXISTS history (book INTEGER NOT NULL, chapter INTEGER NOT NULL, createdAt DATE DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(book,chapter));";
          localDb.executeSql(query5,[],function(result) {
            countQuery++;
            if (countQuery==5) dfd.resolve(true);
          }, function(error) {
            console.error('CREATE bookmark table error = '+JSON.stringify(error));
            dfd.resolve(false);
          });
        },
        function(error){
          console.error("Failed to openDatabase LOCAL_DB.SQLite3 = "+JSON.stringify(error));
          dfd.resolve(false);
        });
      return dfd.promise;
    },
    openDb: function(dbName, isPrimary){
      var dfd = $q.defer();
      var _this = this;
      if (isPrimary){
        bibleDb = window.sqlitePlugin.openDatabase({name: dbName, location: _this.dbLocation},function(){
          dfd.resolve(true);
        }, function(error) {
          console.error('openDb error = '+JSON.stringify(error));
          dfd.resolve(false);
        });
      }
      else{
        secondBibleDb = window.sqlitePlugin.openDatabase({name: dbName, location: _this.dbLocation},function(){
          dfd.resolve(true);
        }, function(error) {
          console.error('openDb error = '+JSON.stringify(error));
          dfd.resolve(false);
        });
      }
      return dfd.promise;
    },
    setConfig: function(key,value){
      var query = "REPLACE INTO configuration (key,value) VALUES (?,?)";
      localDb.executeSql(query,[key,value],function(result){
        },function(error){
        });
    },
    getConfig: function(key){
      var dfd = $q.defer();
      var query = "SELECT value FROM configuration WHERE key LIKE ?";
      localDb.executeSql(query,[key],function(result) {
          var val = false;
          if (result.rows.length > 0) {
            val = result.rows.item(0).value;
          }
          dfd.resolve(val);
        }, function(error) {
          console.error('getConfig error = '+JSON.stringify(error));
          dfd.resolve(false);
        });
      return dfd.promise;
    },
    getAllConfigs: function () {
      var dfd = $q.defer();
      var configs = {};
      var query = "SELECT key,value FROM configuration";
      localDb.executeSql(query, [], function (result) {
        for (var i = 0; i < result.rows.length; i++) {
          configs[result.rows.item(i).key] = result.rows.item(i).value;
        }
        dfd.resolve(configs);
      }, function (error) {
        console.error('getConfig error = ' + JSON.stringify(error));
        dfd.resolve(false);
      });
      return dfd.promise;
    },
    getBool_True_Result: function(boolResult){
      return (boolResult && boolResult.length > 0 && boolResult.indexOf("false")>-1)?false:true;
    },
    getBool_False_Result: function(boolResult){
      return (boolResult && boolResult.length > 0 && boolResult.indexOf("true")>-1)?true:false;
    },
    getBoolNullResult: function(boolResult){
      if (boolResult && boolResult.indexOf("false")>-1){
        return false;
      }else if (boolResult && boolResult.indexOf("true")>-1){
        return true;
      }else{
        return null;
      }
    },
    setFontSize: function(changingAmount){
      this.fontSize += changingAmount;
      this.setConfig(configuration.fontSize,this.fontSize);
    },
    setSpeakingSpeed: function(speed){
      this.speakingSpeed = speed;
      this.setConfig(configuration.speakSpeed,this.speakingSpeed);
    },
    loadAvailableBibles: function(){
      var dfd = $q.defer();
      var _this = this;
      var query = "SELECT bible_code FROM bibles";
      localDb.executeSql(query,[],function(result) {
        for (var i=0; i<result.rows.length; i++) {
          _this.availableBibles.push(result.rows.item(i).bible_code);
        }
        dfd.resolve(_this.availableBibles);
      }, function(error) {
        console.error(JSON.stringify(error));
        dfd.resolve(false);
      });
      return dfd.promise;
    },
    deleteBible: function(bible_code){
      var dfd = $q.defer();
      var _this = this;
      var removingBible = getBible(bible_code);
      window.sqlitePlugin.deleteDatabase({name:removingBible.dbFileName, location: _this.dbLocation}, function () {
        var query = "DELETE FROM bibles WHERE bible_code = ?";
        localDb.executeSql(query,[bible_code],function(result) {
          if (_this.availableBibles.indexOf(bible_code) > -1) {
            _this.availableBibles.splice(_this.availableBibles.indexOf(bible_code), 1);
          }
          dfd.resolve(true);
        }, function(error) {
          console.error('delete Bible from local list table error = '+JSON.stringify(error));
          dfd.resolve(false);
        });
      },function(error){
        console.error("delete sqlite database error " + JSON.stringify(error));
        dfd.resolve(false);
      });
      return dfd.promise;
    },
    downloadBible: function(bible_code){
      var dfd = $q.defer();
      var _this = this;
      var bibleObj = getBible(bible_code);
      var url = encodeURI(Bible.uri + bibleObj.filename);
      downloadDatabase($q, $cordovaFile, localDb, _this.databasePath, bibleObj, url)
        .then(function(bibleCode){
          if (bibleCode){
            _this.availableBibles.push(bibleCode);
            dfd.resolve(bibleCode);
          }else{
            // trying again with an alternative link
            url = bibleObj.url;
            downloadDatabase($q, $cordovaFile, localDb, _this.databasePath, bibleObj, url)
              .then(function(isSuccess){
                if (isSuccess)
                  _this.availableBibles.push(bibleCode);
                dfd.resolve(isSuccess);
              });
          }
        });
      return dfd.promise;
    },
    setPrimaryBible: function(bibleCode){
      var dfd = $q.defer();
      var _this = this;
      _this.primary_bible = bibleCode;
      _this.setConfig(configuration.primary_bible,bibleCode);
      _this.openDb(getBible(bibleCode).dbFileName,true)
        .then(function (isSuccess) {
          dfd.resolve(isSuccess);
        });
      return dfd.promise;
    },
    setSecondaryBible: function(bibleCode){
      var dfd = $q.defer();
      var _this = this;
      _this.secondary_bible = bibleCode;
      _this.setConfig(configuration.secondary_bible, bibleCode);
      _this.openDb(getBible(bibleCode).dbFileName,false)
        .then(function (isSuccess) {
          dfd.resolve(isSuccess);
        });
      // reset secondary book content
      bibleService.selectedBook.second_name = '';
      for (var member in bibleService.selectedBook.verses)
        bibleService.selectedBook.verses[member]['second_text'] = '';
      return dfd.promise;
    },
    highlight: function(verse_number){
      bibleService.selectedBook.highlights.push(verse_number);
      var query = "INSERT INTO highlight (book,chapter,verse) VALUES (?,?,?)";
      localDb.executeSql(query,[bibleService.selectedBook.number,bibleService.selectedBook.chapter,verse_number],
        function() {},
        function(error) {
        console.error(JSON.stringify(error));
      });
    },
    unhighlight: function(verse_number){
      bibleService.selectedBook.highlights.splice(bibleService.selectedBook.highlights.indexOf(verse_number),1);
      var query = "DELETE FROM highlight WHERE (book = ? AND chapter = ? AND verse = ?)";
      localDb.executeSql(query,[bibleService.selectedBook.number,bibleService.selectedBook.chapter,verse_number],
        function() {},
        function(error) {
        console.error(JSON.stringify(error));
      });
    },
    loadHighlightedBooks: function(){
      var dfd = $q.defer();
      var highlight_books = {
        old:[],
        new:[],
        bookIndex: {}
      };
      // loading books of bible
      var query = "SELECT DISTINCT book FROM highlight";
      localDb.executeSql(query,[],function(result) {
        var book, chapter, chapters;
        var index = 0;
        for (var i=0; i<result.rows.length; i++) {
          book = result.rows.item(i).book;
          if (book<470){
            highlight_books.old.push({
              number: book,
              name: bibleService.books.bookIndex[book].name,
              chapters: []
            });
            highlight_books.bookIndex[book] = highlight_books.old[i];
          }else{
            highlight_books.new.push({
              number: book,
              name: bibleService.books.bookIndex[book].name,
              chapters: []
            });
            highlight_books.bookIndex[book] = highlight_books.new[index];
            index++;
          }
        }
        query = "SELECT book,chapter FROM highlight";
        localDb.executeSql(query,[],function(result) {
          for (var i=0; i<result.rows.length; i++) {
            book = result.rows.item(i).book;
            chapter = result.rows.item(i).chapter;
            if(highlight_books.bookIndex[book]['chapters'].indexOf(chapter) < 0){
              highlight_books.bookIndex[book]['chapters'].push(chapter)
            }
          }
          dfd.resolve(highlight_books);
        }, function(error) {
          console.error('loadHighlightedBooks error = '+JSON.stringify(error));
          dfd.resolve(highlight_books);
        });
      }, function(error) {
        console.error('loadHighlightedBooks error = '+JSON.stringify(error));
        dfd.resolve(highlight_books);
      });
      return dfd.promise;
    },
    getHighlights: function(index,limit){
      var dfd = $q.defer();
      var highlights = [];
      var textVerseQuery = '';
      var textVerseQueryParam = [];
      var query = "SELECT book,chapter,verse FROM highlight ORDER BY createdAt DESC LIMIT ?,?";
      localDb.executeSql(query,[index,limit],function(result) {
        var book_number, chapter, verse, text='';
        if (result.rows.length > 0){
          for (var i=0; i<result.rows.length; i++) {
            textVerseQuery += ' (book_number = ? AND chapter = ? AND verse = ?) OR';
            textVerseQueryParam.push(result.rows.item(i).book,result.rows.item(i).chapter,result.rows.item(i).verse);
          }
          textVerseQuery = textVerseQuery.substr(0,textVerseQuery.length-3);
          query = "SELECT book_number,chapter,verse,text FROM verses WHERE ( " + textVerseQuery + " )";
          bibleDb.executeSql(query, textVerseQueryParam,function(result) {
            for (var i = 0; i < result.rows.length; i++) {
              book_number = result.rows.item(i).book_number;
              chapter = result.rows.item(i).chapter;
              verse = result.rows.item(i).verse;
              text = result.rows.item(i).text;
              if (isRemoveStrikedText == true) {
                text = text.replace(/<s>[\s\S]*?<\/s>/ig, "");
              }
              highlights.push({
                book_number:book_number,
                chapter:chapter,
                verse:verse,
                text:text
              });
            }
            dfd.resolve(highlights);
          }, function(error) {
            console.error('retrieve highlight texts error = '+JSON.stringify(error));
          });
        }else{
          dfd.resolve(highlights);
        }
      }, function(error) {
        console.error('retrieve highlights error = '+JSON.stringify(error));
        dfd.resolve(highlights);
      });
      return dfd.promise;
    },
    loadBookmarksOfBook: function (book_number) {
      var _this = this;
      var dfd = $q.defer();
      bibleService.selectedBook.bookmarks = [];
      var query = "SELECT chapter FROM bookmark WHERE book = ?";
      localDb.executeSql(query,[book_number],function(result) {
        for (var i=0; i<result.rows.length; i++) {
          bibleService.selectedBook.bookmarks.push(result.rows.item(i).chapter);
        }
        dfd.resolve(true);
      }, function(error) {
        console.error('retrieve bookmarks of book error = '+JSON.stringify(error));
        dfd.resolve(false);
      });
      return dfd.promise;
    },
    bookmark: function(){
      this.setBookmarkHistory('bookmark',bibleService.selectedBook.number,bibleService.selectedBook.chapter,limitHistory);
      bibleService.selectedBook.bookmarks.push(bibleService.selectedBook.chapter);
      bibleService.selectedBook.isSelectedChapterBookmarked = true;
      return true;
    },
    deleteBookmarkHistory: function(tableName,book,chapter){
      var query = "DELETE FROM "+tableName+" WHERE (book = ? AND chapter = ?)";
      localDb.executeSql(query,[book,chapter],
        function(result) {},
        function(error) {
        console.error(JSON.stringify(error));
      });
      if (tableName=='bookmark' && bibleService.selectedBook.number==book){
        bibleService.selectedBook.bookmarks.splice(bibleService.selectedBook.bookmarks.indexOf(chapter),1);
        if (chapter==bibleService.selectedBook.chapter){
          bibleService.selectedBook.isSelectedChapterBookmarked = false;
        }
      }
    },
    deleteAllBookmarkHistory: function(tableName){
      var query = "DELETE FROM "+tableName+";";
      localDb.executeSql(query, [], function (result) {
      },function(error){
        console.error('delete all '+tableName+' error = '+JSON.stringify(error));
      });
    },
    deleteLimitBookmarkHistory: function(tableName,limit){
      var query = "SELECT book,chapter FROM "+tableName+" ORDER BY createdAt DESC LIMIT ?,10;";
      localDb.executeSql(query, [limit-1], function (result) {
        var params = [];
        var condition = '';
        for (var i = 0; i < result.rows.length; i++){
          params.push(result.rows.item(i).book);
          params.push(result.rows.item(i).chapter);
          condition += 'OR (book = ? AND chapter = ?) '
        }
        condition = condition.substr(3);
        if (params.length > 0){
          query = "DELETE FROM "+tableName+" WHERE "+condition;
          localDb.executeSql(query, params, function (result) {
          },function(error){
            console.error('delete '+tableName+' error = '+JSON.stringify(error));
          });
        }
      },function(error){
        console.error('delete '+tableName+' error = '+JSON.stringify(error));
      });
    },
    setBookmarkHistory: function(tableName,book,chapter,limit){
      this.deleteLimitBookmarkHistory(tableName,limit);
      var query = "INSERT OR REPLACE INTO "+tableName+" (book,chapter) VALUES(?,?) ; ";
      localDb.executeSql(query, [book,chapter], function () {
      },function(error){
        console.error('INSERT "+tableName+" error = '+JSON.stringify(error));
      });
    },
    getBookmarkHistory: function(tableName,limit){
      var dfd = $q.defer();
      var histories = [];
      var query = "SELECT book,chapter,createdAt FROM "+tableName+" ORDER BY createdAt DESC ;";
      if (limit > 0)
        query = "SELECT book,chapter,createdAt FROM "+tableName+" ORDER BY createdAt DESC LIMIT 0,"+limit+" ;";
      if (localDb){
        localDb.executeSql(query, [], function (result) {
          var book,book_name,chapter,createdAt;
          for (var i = 0; i < result.rows.length; i++) {
            book = result.rows.item(i).book;
            book_name = bibleService.books.bookIndex[book].name;
            chapter = result.rows.item(i).chapter;
            createdAt = result.rows.item(i).createdAt;
            histories.push({book:book,book_name:book_name,chapter:chapter,createdAt:createdAt});
          }
          dfd.resolve(histories);
        }, function(error) {
          console.error('getBookmarkHistory error = '+JSON.stringify(error));
          dfd.resolve(histories);
        });
      }else {
        dfd.resolve(histories);
      }
      return dfd.promise;
    },
    restoreBookmarkHistory: function($scope,item){
      var dfd = $q.defer();
      this.loadBookmarksOfBook(item.book);
      this.setBookmarkHistory('history',item.book,item.chapter,limitHistory);
      bibleService.updateSecondBookname(item.book);
      bibleService.setSelectedBook(item.book)
        .then(function () {
          bibleService.setSelectedChapter(item.chapter)
            .then(function () {
              dfd.resolve(true);
            });
        });
      return dfd.promise;
    },
    setDualBible: function(dualBibleBool){
      this.isDualBible = dualBibleBool;
      this.setConfig(configuration.dual_bible,dualBibleBool);
    },
    setCurrentVersion: function(){
      this.setConfig(configuration.currentVersion,curVersion);
    },
    modal_notification_open: function ($scope) {
      $ionicModal.fromTemplateUrl('templates/modal_notification.html', {
        scope: $scope
      }).then(function (modal) {
        modal_notification = modal;
        modal_notification.show();
      });
    },
    modal_notification_close: function (){
      if (modal_notification) modal_notification.remove();
    },
    loading_show: function () {
      $ionicLoading.show({template:'Loading...'});
    },
    loading_hide: function () {
      $ionicLoading.hide();
    },
    popover_history_open: function ($scope,$event) {
      var _this = this;
      $ionicPopover.fromTemplateUrl('templates/popover_history.html', {
        scope: $scope
      }).then(function (popover) {
        popover_history = popover;
        _this.getBookmarkHistory('history', 9)
          .then(function (result) {
            $scope.shortHistories = result;
            popover_history.show($event);
          });
      });
    },
    popover_history_close: function (){
      if (popover_history) popover_history.remove();
    }
  }
});
