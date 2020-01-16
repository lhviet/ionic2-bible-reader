app.factory('bibleService', function($q,$sce,$ionicPopover) {
  var popover_bible=false;
  return {
    reset: function(){
      this.books = {
        old:[],
        new:[],
        list: [],
        bookIndex: {}
      };
      this.selectedBook = {
        number: 0,
        name: "",
        chapters: [],  // chapters = [1,2,3...]
        chapter: 0,
        verses: [],
        verseIndex: {},
        bookmarks: [], // array of bookmarked chapters
        isSelectedChapterBookmarked : false
      };
    },
    books:{
      old:[],
      new:[],
      list: [],
      bookIndex: {}
    },
    selectedBook:{
      number: 0,
      name: "",
      second_name: "",
      chapters: [],  // chapters = [1,2,3...]
      chapter: 0,
      verses: [],
      verseIndex: {},
      highlights: [],
      bookmarks: [], // array of bookmarked chapters
      isSelectedChapterBookmarked : false
    },
    loadBooks: function(){    // loading books of bible
      var dfd = $q.defer();
      var _this = this;
      var query = "SELECT book_number,long_name FROM books";
      bibleDb.executeSql(query,[],function(result) {
        var book_number;
        var index = 0;
        _this.books.old = [];
        _this.books.new = [];
        _this.books.bookIndex = {};
        for (var i=0; i<result.rows.length; i++) {
          book_number = result.rows.item(i).book_number;
          if (book_number<470){
            _this.books.old.push({number:book_number,name:result.rows.item(i).long_name,chapters: []});
            _this.books.bookIndex[book_number] = _this.books.old[i];
          }else{
            _this.books.new.push({number:book_number,name:result.rows.item(i).long_name,chapters: []});
            _this.books.bookIndex[book_number] = _this.books.new[index];
            index++;
          }
        }
        dfd.resolve(true);
      }, function(error) {
        console.log('bibleService loadBooks error = '+JSON.stringify(error));
        dfd.resolve(false);
      });
      return dfd.promise;
    },
    loadChapters: function(){ // loading all chapters into loaded books
      var query = "SELECT DISTINCT book_number,chapter FROM verses";
      var _this = this;
      bibleDb.executeSql(query, [], function(result) {
        var book_number;
        for (var i=0; i<result.rows.length; i++) {
          book_number = result.rows.item(i).book_number;
          _this.books.bookIndex[book_number].chapters.push(result.rows.item(i).chapter);
        }
      }, function(error) {
        console.log('bibleService loadChapters error = '+JSON.stringify(error));
      });
    },
    setSelectedBook: function (book_number) {
      var dfd = $q.defer();
      var _this = this;
      this.updateSecondBookname(book_number);
      _this.selectedBook.number = book_number;
      _this.selectedBook.name = _this.books.bookIndex[book_number].name;
      _this.selectedBook.chapters = _this.books.bookIndex[book_number].chapters;
      if (_this.selectedBook.chapters.length==0){
        var query = "SELECT DISTINCT chapter FROM verses WHERE book_number = ?";
        bibleDb.executeSql(query, [book_number],function(result) {
          for (var i=0; i<result.rows.length; i++) {
            _this.selectedBook.chapters.push(result.rows.item(i).chapter);
          }
          dfd.resolve(true);
        }, function(error) {
          console.log('setSelectedBook error = '+JSON.stringify(error));
          dfd.resolve(false);
        });
      }else{
        dfd.resolve(true);
      }
      return dfd.promise;
    },
    setSelectedChapter: function(chapter_number){
      var dfd = $q.defer();
      var _this = this;
      _this.selectedBook.chapter = chapter_number;
      _this.selectedBook.second_name = '';
      var query = "SELECT verse,text FROM verses WHERE book_number = ? AND chapter = ?";
      bibleDb.executeSql(query, [_this.selectedBook.number,chapter_number],function(result) {
        var verse,text;
        // clear the verses
        _this.selectedBook.verses = [];
        _this.selectedBook.verseIndex = {};
        // loading verses' content
        for (var i=0; i<result.rows.length; i++) {
          verse = result.rows.item(i).verse;
          text = result.rows.item(i).text;
          if (isRemoveStrikedText==true){
            text = text.replace(/<s>[\s\S]*?<\/s>/ig, "");
          }
          _this.selectedBook.verses.push({verse:verse.toString(),text:text});
          _this.selectedBook.verseIndex[verse] = _this.selectedBook.verses[i];
        }
        dfd.resolve(true);
      }, function(error) {
        console.log('bibleService - setSelectedChapter error = '+JSON.stringify(error));
        dfd.resolve(false);
      });
      this.addSecondChapter(chapter_number);
      return dfd.promise;
    },
    getChapterHighlights: function (chapter_number) {
      var dfd = $q.defer();
      var _this = this;
      _this.selectedBook.highlights = [];
      // query highlights of verses in selected chapter
      var query = "SELECT verse FROM highlight WHERE (book = ? AND chapter = ?)";
      localDb.executeSql(query,[_this.selectedBook.number,chapter_number],function(result) {
        var verse;
        for (var i=0; i<result.rows.length; i++) {
          verse = result.rows.item(i).verse;
          _this.selectedBook.highlights.push(verse.toString());
        }
        dfd.resolve(true);
      }, function(error) {
        console.error('bibleService - setSelectedChapter highlights error = '+JSON.stringify(error));
        dfd.resolve(false);
      });
      return dfd.promise;
    },
    getChapterStories: function (chapter_number) {
      var dfd = $q.defer();
      var _this = this;
      // query stories (titles) of verses in selected chapter
      var query = "SELECT verse,title FROM stories WHERE (book_number = ? AND chapter = ?)";
      bibleDb.executeSql(query,[_this.selectedBook.number,chapter_number],function(result) {
        var verse;
        for (var i=0; i<result.rows.length; i++) {
          verse = result.rows.item(i).verse;
          _this.selectedBook.verseIndex[verse]['title'] = result.rows.item(i).title;
        }
        dfd.resolve(true);
      }, function(error) {
        dfd.resolve(true);
      });
      return dfd.promise;
    },
    addSecondChapter: function(chapter_number){
      var dfd = $q.defer();
      var _this = this;
      if (secondBibleDb) {
        var query = "SELECT verse,text FROM verses WHERE book_number = ? AND chapter = ?";
        secondBibleDb.executeSql(query, [_this.selectedBook.number, chapter_number],function (result) {
          var verse, text;
          // loading verses' content
          for (var i = 0; i < result.rows.length; i++) {
            text = result.rows.item(i).text;
            if (isRemoveStrikedText == true) {
              text = text.replace(/<s>[\s\S]*?<\/s>/ig, "");
            }
            _this.selectedBook.verseIndex[result.rows.item(i).verse]['second_text'] = text;
          }
          // query stories (titles) of verses in selected chapter
          query = "SELECT verse,title FROM stories WHERE (book_number = ? AND chapter = ?)";
          secondBibleDb.executeSql(query, [_this.selectedBook.number, chapter_number],function (result) {
            for (var i = 0; i < result.rows.length; i++) {
              verse = result.rows.item(i).verse;
              _this.selectedBook.verseIndex[verse]['second_title'] = result.rows.item(i).title;
            }
            dfd.resolve(true);
          }, function (error) {
            dfd.resolve(true);
          });
        }, function (error) {
          console.log('bibleService - setSelectedChapter query error = ' + JSON.stringify(error));
          dfd.resolve(false);
        });
      }else{
        console.log('bibleService - setSelectedChapter - Secondary Bible is not set');
        dfd.resolve(false);
      }
      return dfd.promise;
    },
    updateSecondBookname: function(book_number){
      var _this = this;
      _this.selectedBook.second_name = '';
      if (secondBibleDb){
        var query = "SELECT long_name FROM books WHERE book_number LIKE ?";
        secondBibleDb.executeSql(query,[book_number],function(result) {
          if (result.rows.length==1){
            _this.selectedBook.second_name = result.rows.item(0).long_name;
          }
        }, function(error) {
          console.log('updateSecondBookname error = '+JSON.stringify(error));
        });
      }else{
        console.log('updateSecondBookname - secondary bible is not set');
      }
    },
    searchVerseText: function(searchText,index,limit){
      var dfd = $q.defer();
      var _this = this;
      var verseResults = [];
      var searchTextArray = searchText.split(' ');
      var queryText = searchText.trim().replace(/\s/ig,'%');
      queryText = '%' + queryText + '%';
      var query = "SELECT book_number,chapter,verse,text FROM verses WHERE text LIKE ? LIMIT ?,?";
      if (bibleDb){
        bibleDb.executeSql(query, [queryText,index,limit],function (result) {
          var book_number,chapter,verse,text,book_name;
          var re;
          // loading verses' content
          for (var i = 0; i < result.rows.length; i++) {
            book_number = result.rows.item(i).book_number;
            chapter = result.rows.item(i).chapter;
            verse = result.rows.item(i).verse;
            text = result.rows.item(i).text;
            if (isRemoveStrikedText == true) {
              text = text.replace(/<s>[\s\S]*?<\/s>/ig, "");
            }
            for (var j=0; j<searchTextArray.length; j++){
              text = highlight(bolder(text, searchTextArray[j]), searchTextArray[j]);
            }
            book_name = _this.books.bookIndex[book_number].name;
            verseResults.push({
              book_number: book_number,
              book_name: book_name,
              chapter: chapter,
              verse: verse,
              text: $sce.trustAsHtml(text)
            });
          }
          dfd.resolve(verseResults);
        }, function (error) {
          console.log('bibleService - searchVerseText query error = ' + JSON.stringify(error));
          dfd.resolve(verseResults);
        });
      }else{
        dfd.resolve(verseResults);
      }
      return dfd.promise;
    },
    popover_bible_open: function ($scope,$event,availableBibles) {
      $scope.availableBibles_inPopover = [];
      $ionicPopover.fromTemplateUrl('templates/popover_bible.html', {
        scope: $scope
      }).then(function (popover) {
        popover_bible = popover;
        for (var i = 0; i < availableBibles.length; i++) {
          $scope.availableBibles_inPopover.push(getBible(availableBibles[i]));
        }
        popover_bible.show($event);
      });
    },
    popover_bible_close: function (){
      if (popover_bible) popover_bible.remove();
    }
  };
});
