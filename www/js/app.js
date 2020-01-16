var $appScope;
var $homepageScope;
var $chapterScope;

var app = angular.module('starter', ['ionic', 'ngCordova']);
app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/app_homepage/template_app.html',
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: '/homepage',
      views: {
        menuContent: {
          templateUrl: 'templates/app_homepage/template_app_page_homepage.html',
          controller: 'HomePageCtrl'
        }
      }
    })
    .state('bible', {
      url: '/bible',
      abstract: true,
      templateUrl: 'templates/bible_chapter/template_bible.html',
      controller: 'BookMenuCtrl'
    })
    .state('bible.chapter', {
      url: "/chapter",
      cache: false,
      views: {
        menuContent: {
          templateUrl: 'templates/bible_chapter/template_bible_page_chapter.html',
          controller: 'ChapterCtrl'
        }
      }
    })
    .state('highlight', {
      url: '/highlight',
      abstract: true,
      cache: false,
      templateUrl: 'templates/highlight_page/template_highlight.html',
      controller: 'HighlightMenuCtrl'
    })
    .state('highlight.highlights', {
      url: "/highlights",
      cache: false,
      views: {
        menuContent: {
          templateUrl: 'templates/highlight_page/template_highlight_page_highlight.html',
          controller: 'HighlightsCtrl'
        }
      }
    })
    .state('default', {
      url: '/default',
      abstract: true,
      templateUrl: 'templates/default_pages/template_default.html'
    })
    .state('default.about', {
      url: '/about',
      views: {
        menuContent: {
          templateUrl: 'templates/default_pages/template_default_page_about.html',
          controller: 'AboutCtrl'
        }
      }
    })
    .state('default.search', {
      url: '/search',
      views: {
        menuContent: {
          templateUrl: 'templates/default_pages/template_default_page_search.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('default.download_bibles', {
      url: '/download-bibles',
      views: {
        menuContent: {
          templateUrl: 'templates/default_pages/template_default_page_download.html',
          controller: 'DownloadBibleCtrl'
        }
      }
    })
    .state('default.setting', {
      url: '/setting',
      views: {
        menuContent: {
          templateUrl: 'templates/default_pages/template_default_page_setting.html',
          controller: 'SettingPageCtrl'
        }
      }
    })
    .state('default.bookmark', {
      url: '/bookmark',
      cache: false,
      views: {
        menuContent: {
          templateUrl: 'templates/default_pages/template_default_tabs_bookmark.html',
          controller: 'BookmarkCtrl'
        }
      }
    })
    .state('default.history', {
      url: '/history',
      cache: false,
      views: {
        menuContent: {
          templateUrl: 'templates/default_pages/template_default_tabs_history.html',
          controller: 'HistoryCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise("/app/homepage");
});
app.run(function ($rootScope, $ionicPlatform, $ionicHistory, $state, $q, $ionicModal, $ionicPopover,
                  $cordovaGoogleAnalytics, settingService, bibleService) {
  $rootScope.fontSize = settingService.fontSize;
  $rootScope.fontSizeClass = getClassFontSize($rootScope.fontSize);
  $rootScope.fontUsageClass = getClassFontSize($rootScope.fontSize - 2);
  $rootScope.fontScriptClass = getClassFontSize($rootScope.fontSize - 4);
  $rootScope.fontNumberClass = getClassFontSize($rootScope.fontSize - 6);

  $ionicPlatform.ready(function () {
    var admobid = {};
    if (/(android)/i.test(navigator.userAgent)) { // for android
      settingService.databasePath = Bible.android_db;
      settingService.dbLocation = Bible.android_db_location;
      admobid = {
        banner: 'ca-app-pub-6148713949526588/4298577714', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-6148713949526588/5775310914'
      };
    } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
      settingService.databasePath = Bible.ios_db;
      settingService.dbLocation = Bible.iOS_db_location;
      admobid = {
        banner: 'ca-app-pub-6148713949526588/8728777311', // or DFP format "/6253334/dfp_example_ad"
        interstitial: 'ca-app-pub-6148713949526588/1205510510'
      };
    }
    if (isAds && AdMob) {
      AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true
      });
      AdMob.prepareInterstitial({adId: admobid.interstitial, autoShow: false});
    }
    // $cordovaGoogleAnalytics
    window.analytics.startTrackerWithId("UA-29094709-14");
    AppRate.preferences.storeAppURL.android = ratingUrlAndroid;
    AppRate.preferences.storeAppURL.ios = ratingUrliOS;

    registerHardwardBackBtn($ionicPlatform, $ionicHistory, $state);
    initialSetup($rootScope, $ionicModal, settingService, bibleService);
  });
});
app.controller('AppCtrl', function ($rootScope, $scope, $state, $ionicPopover,$timeout,
                                    bibleService, settingService) {
  $appScope = $scope;
  $scope.primary_bible = false;
  $scope.secondary_bible = false;
  $scope.init = function () {};

  // Popover for selecting bible
  $scope.openPopoverBibles = function ($event) {
    bibleService.popover_bible_open($scope,$event,settingService.availableBibles);
  };
  $scope.closePopoverBibles = bibleService.popover_bible_close;

  $scope.selectBible = function (bibleCode) {
    if (bibleCode != settingService.primary_bible){
      settingService.setPrimaryBible(bibleCode)
        .then(function (result) {
          if (result) loadBibleContent(bibleService);
        });
      if ($scope.secondary_bible == bibleCode && $scope.availableBibles_inPopover.length > 1) {
        if ($scope.availableBibles_inPopover[0].code != bibleCode) {
          $scope.secondary_bible = $scope.availableBibles_inPopover[0].code;
          settingService.setSecondaryBible($scope.availableBibles_inPopover[0].code);
        }
        else if ($scope.availableBibles_inPopover[1].code != bibleCode) {
          $scope.secondary_bible = $scope.availableBibles_inPopover[1].code;
          settingService.setSecondaryBible($scope.availableBibles_inPopover[1].code);
        }
      }
      $scope.updateScopeVariables();
    }
    $scope.closePopoverBibles();
  };
  $scope.updateScopeVariables = function () {
    $scope.primary_bible = settingService.primary_bible;
    $scope.secondary_bible = settingService.secondary_bible;
  };
});
app.controller('HomePageCtrl', function ($rootScope, $scope, $state,
                                         $ionicScrollDelegate, $timeout, $ionicPopover,
                                         bibleService, settingService) {
  $homepageScope = $scope;
  $scope.searchText = '';
  $scope.oldNewGroup = [0];
  $scope.books = bibleService.books;
  $scope.init = function(){
    if (window.analytics) window.analytics.trackView('Home Page');
  };
  $scope.toggleGroup = toggleGroup;
  $scope.isGroupShown = isGroupShown;
  $scope.selectBook = function(book_number){
    settingService.loadBookmarksOfBook(book_number);
    bibleService.setSelectedBook(book_number)
      .then(function () {
        updateSelectedBook($scope,$timeout,bibleService,0);
      });
  };
  $scope.selectChapter = function (chapter_number) {
    settingService.loading_show();
    settingService.setBookmarkHistory('history',bibleService.selectedBook.number,chapter_number,limitHistory);
    bibleService.getChapterHighlights(chapter_number);
    bibleService.getChapterStories(chapter_number);
    bibleService.setSelectedChapter(chapter_number)
      .then(function () {
        $state.transitionTo('bible.chapter');
      });
  };
  $scope.openHistory = function ($event) {
    settingService.popover_history_open($scope,$event);
  };
  $scope.closePopoverHistory = settingService.popover_history_close;
  // restore history
  $scope.restoreBookmarkHistory = function (item) {
    settingService.loading_show();
    settingService.restoreBookmarkHistory($scope,item)
      .then(function () {
        $state.transitionTo('bible.chapter');
      });
    $scope.closePopoverHistory();
  };
  $scope.scrollTop = function () {
    $scope.oldNewGroup = [0];
    $ionicScrollDelegate.scrollTop();
  };
});

/**
 * Controller of Bible Management Page
 */
app.controller('DownloadBibleCtrl', function ($rootScope, $scope, $state, $ionicHistory,
                                              bibleService, settingService) {
  $scope.downloadingBibles = [];
  $scope.bibles = {};
  $scope.bibleGroup = [];
  $scope.availableBibles = settingService.availableBibles;
  //$scope.bibleGroup = ['en','vi','kr','zh,'hi','es','fr','de','it','cs','id','ar','am','th','my','km','ha'];
  $scope.init = function () {
    if (window.analytics) window.analytics.trackView('Download Page');
  };
  $scope.isGroupShown = isGroupShown;
  $scope.toggleBibleGroup = function (element) {
    $scope.bibleGroup = toggleGroup($scope.bibleGroup, element);
    if (!$scope.bibles[element]) {
      $scope.bibles[element] = Bible.list[element];
    }
  };
  $scope.primary_bible = settingService.primary_bible;
  $scope.secondary_bible = settingService.secondary_bible;
  $scope.deleteBible = function (bible_code) {
    settingService.deleteBible(bible_code)
      .then(function (isSuccess) {
        if (isSuccess) {
          if ($scope.availableBibles.indexOf($scope.primary_bible) < 0) {
            bibleService.reset();
            if ($homepageScope){
              $homepageScope.books = bibleService.books;
              $homepageScope.selectedBook = bibleService.selectedBook;
            }
            if ($scope.availableBibles.length == 1) {
              setDefaultBible(bibleService, settingService, $scope.availableBibles[0]);
              $scope.secondary_bible = false;
            } else if ($scope.primary_bible == bible_code && $scope.availableBibles.length > 1) {
              setDefaultBible(bibleService, settingService, $scope.availableBibles[0]);
              settingService.setSecondaryBible($scope.availableBibles[1]);
            } else if (!$scope.availableBibles || $scope.availableBibles.length == 0) {
              $scope.primary_bible = false;
              $scope.secondary_bible = false;
            }
          }
        }
      });
  };
  $scope.downloadBible = function (bible_code) {
    if (!$scope.availableBibles || $scope.availableBibles.indexOf(bible_code) < 0) {
      $scope.downloadingBibles.push(bible_code);
      settingService.downloadBible(bible_code)
        .then(function (bible_code) {
          if (bible_code){
            $scope.downloadingBibles.splice($scope.downloadingBibles.indexOf(bible_code), 1);
            if ($scope.availableBibles.length == 1) {
              setDefaultBible(bibleService, settingService, bible_code);
            } else if ($scope.availableBibles.length == 2) {
              settingService.setSecondaryBible(bible_code);
            }
          }
        });
    }
    else if ($scope.availableBibles.indexOf(bible_code) > -1) {
      setDefaultBible(bibleService, settingService, bible_code);
      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $state.transitionTo('app.home');
    }
  };
});
app.controller('BookMenuCtrl', function ($rootScope, $scope, $ionicScrollDelegate, $cordovaClipboard,
                                         $cordovaToast, $ionicPopover, $timeout,
                                         bibleService, settingService) {
  $scope.searchText = '';
  $scope.toggleGroup = toggleGroup;
  $scope.isGroupShown = isGroupShown;
  $scope.oldNewGroup = [0];
  $scope.books = bibleService.books;
  $scope.selectedBook = bibleService.selectedBook;
  $scope.selectBook = function (book_number) {
    bibleService.setSelectedBook(book_number);
    settingService.loadBookmarksOfBook(book_number);
  };
  $scope.selectChapter = function (chapter_number) {
    settingService.loading_show();
    settingService.setBookmarkHistory('history',$scope.selectedBook.number,chapter_number,limitHistory);
    bibleService.setSelectedChapter(chapter_number)
      .then(function () {
        settingService.loading_hide();
        $chapterScope.updatePageName();
        updateSelectedBook($chapterScope,$timeout,bibleService,0);
      });
    bibleService.getChapterHighlights(chapter_number);
    bibleService.getChapterStories(chapter_number);
    $ionicScrollDelegate.scrollTop();
    showAdmobInterstitial();
  };
  $scope.scrollTop = function () {
    $scope.oldNewGroup = [0];
    $ionicScrollDelegate.scrollTop();
  };
});
app.controller('ChapterCtrl', function ($rootScope, $scope, $ionicScrollDelegate,
                                        $cordovaClipboard, $cordovaToast, $ionicPopover,
                                        $state, bibleService, settingService, $timeout) {
  $chapterScope = $scope;

  $scope.primary_bible = settingService.primary_bible;
  $scope.secondary_bible = settingService.secondary_bible;
  $scope.speakingSpeed = settingService.speakingSpeed;
  $scope.isDualBible = settingService.isDualBible;
  $scope.isSecondaryBible = false;
  $scope.chapter_pageName = '';
  $scope.searchText = '';
  $scope.bibleLang = getBible($scope.primary_bible).language;
  $scope.init = function () {
    if (window.analytics) window.analytics.trackView('Chapter Page');
    $scope.isHideHeader = false;
    $scope.isCopyMode = false;
    $scope.updatePageName();
    showAdmobInterstitial();
    settingService.loading_hide();
    updateChapterBookmarkStatus(bibleService);
    $scope.selectedBook = bibleService.selectedBook;
    updateSelectedBook($scope,$timeout,bibleService,2000);
  };
  $scope.popover_setting = null;
  $ionicPopover.fromTemplateUrl('templates/popover_chapter_setting.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover_setting = popover;
  });
  $scope.openPopoverSetting = function ($event) {
    $scope.bibleLang = getBible(settingService.primary_bible).language;
    $scope.popover_setting.show($event);
  };
  $scope.closePopoverChapterSetting = function ($event) {
    $scope.popover_setting.hide();
  };
  $scope.increaseFontSize = function () {
    settingService.loading_show();
    settingService.setFontSize(2);
    $timeout(function () {
      $rootScope.fontSize = settingService.fontSize;
      reloadFontSize($rootScope);
      settingService.loading_hide();
    },200);
  };
  $scope.decreaseFontSize = function () {
    settingService.loading_show();
    settingService.setFontSize(-2);
    $timeout(function () {
      $rootScope.fontSize = settingService.fontSize;
      reloadFontSize($rootScope);
      settingService.loading_hide();
    },200);
  };
  $scope.increaseSpeakingSpeed = function () {
    increaseSpeakingSpeed(settingService);
    $scope.speakingSpeed = settingService.speakingSpeed;
  };
  $scope.decreaseSpeakingSpeed = function () {
    decreaseSpeakingSpeed(settingService);
    $scope.speakingSpeed = settingService.speakingSpeed;
  };
  $scope.toggleCopyMode = function () {
    $scope.isCopyMode = $scope.isCopyMode ? false : true;
    $scope.popover_setting.hide();
    $scope.resetCopy();
  };
  $scope.toggleBookmark = function () {
    if (bibleService.selectedBook.isSelectedChapterBookmarked) {
      settingService.deleteBookmarkHistory('bookmark', bibleService.selectedBook.number, bibleService.selectedBook.chapter);
    } else {
      settingService.bookmark();
    }
    $scope.closePopoverChapterSetting();
  };
  $scope.openHistory = function ($event) {
    settingService.popover_history_open($scope,$event);
  };
  $scope.closePopoverHistory = settingService.popover_history_close;
  $scope.restoreBookmarkHistory = function (item) {
    settingService.loading_show();
    settingService.restoreBookmarkHistory($scope,item)
      .then(function () {
        $scope.updatePageName();
        $scope.selectedBook = bibleService.selectedBook;
        updateSelectedBook($scope,$timeout,bibleService,2000);
        settingService.loading_hide();
      });
    showAdmobInterstitial();
    $ionicScrollDelegate.scrollTop();
    $scope.closePopoverHistory();
  };
  $scope.tts = tts;
  $scope.updatePageName = function () {
    $scope.chapter_pageName =
      ($scope.isSecondaryBible ? bibleService.selectedBook.second_name : bibleService.selectedBook.name)
      + " " + bibleService.selectedBook.chapter + " : " + bibleService.selectedBook.verses.length + "v";
  };

  $scope.hideHeaderBar = function () {
    $scope.isHideHeader = $scope.isHideHeader ? false : true;
  };
  $scope.switchBible = function ($event) {
    if ($scope.secondary_bible) {
      if (!bibleService.selectedBook.second_name || bibleService.selectedBook.second_name.length == 0) {
        bibleService.updateSecondBookname(bibleService.selectedBook.number);
        bibleService.addSecondChapter(bibleService.selectedBook.chapter)
          .then(function (isSuccess) {
            if (isSuccess) {
              $timeout(function () {
                $scope.$apply(function () {
                  $scope.isSecondaryBible = $scope.isSecondaryBible ? false : true;
                })
              });
            }
          });
      } else {
        $scope.isSecondaryBible = $scope.isSecondaryBible ? false : true;
      }
    } else {
      $cordovaToast.showShortCenter('Please set <b>Secondary Bible</b> in Setting to use this feature !');
    }
  };
  $scope.copyText = [];
  $scope.highlight_copies = [];
  $scope.onTapVerse = function (verse) {
    var id = verse.verse;
    var uniqueId = bibleService.selectedBook.number + "_" + bibleService.selectedBook.chapter + "_" + id;
    if ($scope.isCopyMode == true) {
      // copy text to clipboard
      var index = $scope.highlight_copies.indexOf(uniqueId);
      if (index < 0) {
        var text = '';
        if ($scope.isSecondaryBible == false) {
          if ($scope.copyText.length > 0)
            text = "\n";
          text += "(" + bibleService.selectedBook.name + " " + bibleService.selectedBook.chapter + ":" + id + ") " + verse.text;
        } else {
          if ($scope.isDualBible == true) {
            if ($scope.copyText.length > 0)
              text = "\n";
            text += "(" + bibleService.selectedBook.name + " " + bibleService.selectedBook.chapter + ":" + id + ") " + verse.text;
            text += "\n" + "(" + bibleService.selectedBook.second_name + " " + bibleService.selectedBook.chapter + ":" + id + ") " + verse.second_text;
          } else {
            if ($scope.copyText.length > 0)
              text = "\n";
            text += "(" + bibleService.selectedBook.second_name + " " + bibleService.selectedBook.chapter + ":" + id + ") " + verse.second_text;
          }
        }
        $scope.copyText.push(text);
        $scope.highlight_copies.push(uniqueId);
        $cordovaToast.showShortBottom('Press Copy Button to copy.');
      } else {
        $scope.copyText.splice(index, 1);
        $scope.highlight_copies.splice(index, 1);
      }
    }
    else {
      // highlight (change font-weight also) text
      var index = bibleService.selectedBook.highlights.indexOf(id);
      if (index > -1) {
        settingService.unhighlight(id);
      } else {
        settingService.highlight(id);
      }
    }
  };
  $scope.copySelectedVerses = function () {
    var fullText = '';
    for (var index = 0; index < $scope.copyText.length; index++) {
      fullText += $scope.copyText[index];
    }
    $cordovaClipboard.copy(fullText);
    $cordovaToast.showShortBottom('Copied to clipboard.');
    $scope.isCopyMode = false;
    $scope.resetCopy();
  };
  $scope.resetCopy = function () {
    $scope.copyText = [];
    $scope.highlight_copies = [];
  };
  $scope.highlightSearch = function () {
    angular.forEach(bibleService.selectedBook.verses, function (verseObj, verse_number) {
      delete verseObj.text_highlight;
      if ($scope.searchText.length > 1) {
        verseObj.text_highlight = highlight(bolder(verseObj.text, $scope.searchText), $scope.searchText);
      }
    });
  };
});

app.controller('HighlightMenuCtrl', function ($rootScope, $scope, $ionicScrollDelegate, $timeout,$state,
                                              bibleService,settingService) {
  $scope.toggleGroup = toggleGroup;
  $scope.isGroupShown = isGroupShown;
  $scope.oldNewGroup = [0];
  $scope.init = function () {
    $scope.selectedBook = bibleService.selectedBook;
    $scope.selectedBook.number = 0;
    $scope.selectedBook.chapters = [];
    settingService.loadHighlightedBooks()
      .then(function (resultBooks) {
        $scope.highlightedBooks = resultBooks;
      });
  };
  $scope.selectBook = function (book_number) {
    settingService.loadBookmarksOfBook(book_number);
    bibleService.setSelectedBook(book_number)
      .then(function () {
        bibleService.selectedBook['chapters'] = $scope.highlightedBooks.bookIndex[book_number]['chapters'];
      });
  };
  $scope.selectChapter = function (chapter_number) {
    settingService.loading_show();
    settingService.setBookmarkHistory('history',bibleService.selectedBook.number,chapter_number,limitHistory);
    bibleService.setSelectedChapter(chapter_number)
      .then(function () {
        $state.transitionTo('bible.chapter');
      });
    bibleService.getChapterHighlights(chapter_number);
    bibleService.getChapterStories(chapter_number);
  };
  $scope.scrollTop = function () {
    $scope.oldNewGroup = [0];
    $ionicScrollDelegate.scrollTop();
  };
});
app.controller('HighlightsCtrl', function ($rootScope, $scope, $ionicScrollDelegate, $state, bibleService, settingService) {
  $scope.init = function () {
    if (window.analytics) window.analytics.trackView('Highlight Page');
    $scope.index = 0;
    $scope.limit = 100;
    $scope.isLoadMore = true;
    $scope.highlights = [];
    $scope.loadHighlights();
    $scope.selectedBook = bibleService.selectedBook;
  };
  // loading highlighted verses
  $scope.loadHighlights = function () {
    settingService.getHighlights($scope.index, $scope.limit)
      .then(function (highlights) {
        $scope.highlights = $scope.highlights.concat(highlights);
        $scope.index += $scope.highlights.length;
        if (highlights.length < $scope.limit) {
          $scope.isLoadMore = false;
        }
      });
  };
  // retrieve book name of verse
  $scope.getBookname = function (book_number) {
    return bibleService.books.bookIndex[book_number].name;
  };
});
/**
 * Controller of Search Page
 */
app.controller('SearchCtrl', function ($rootScope, $scope, $state, $ionicScrollDelegate, $timeout,
                                       bibleService, settingService) {
  $scope.index = 0;
  $scope.limit = 20;
  $scope.searchText = '';
  $scope.verses = [];
  $scope.selectedBook = bibleService.selectedBook;
  if (window.analytics) window.analytics.trackView('Search Page');

  $scope.searchVerse = function () {
    if ($scope.searchText && $scope.searchText.length > 2) {
      bibleService.searchVerseText($scope.searchText, $scope.index, $scope.limit)
        .then(function (result) {
          $scope.verses = result;
          $ionicScrollDelegate.scrollTop();
        });
    }
  };
  $scope.openBookChapter = function (verse) {
    settingService.loading_show();
    settingService.loadBookmarksOfBook(verse.book_number);
    settingService.setBookmarkHistory('history',verse.book_number,verse.chapter,limitHistory);
    bibleService.updateSecondBookname(verse.book_number);
    bibleService.setSelectedBook(verse.book_number)
      .then(function () {
        bibleService.setSelectedChapter(verse.chapter)
          .then(function () {
            $state.transitionTo('bible.chapter');
          });
      });
  };
});
/**
 * Controller of Setting page
 */
app.controller('SettingPageCtrl', function ($rootScope, $scope, $ionicPopover,
                                            settingService, bibleService) {
  $scope.init = function () {
    if (window.analytics) window.analytics.trackView('Setting Page');
    $scope.primary_bible = settingService.primary_bible;
    $scope.secondary_bible = settingService.secondary_bible;
    $scope.speakingSpeed = settingService.speakingSpeed;
    $scope.isDualBible = settingService.isDualBible;
  };
  $scope.increaseFontSize = function () {
    settingService.setFontSize(2);
    $rootScope.fontSize = settingService.fontSize;
    reloadFontSize($rootScope);
  };
  $scope.decreaseFontSize = function () {
    settingService.setFontSize(-2);
    $rootScope.fontSize = settingService.fontSize;
    reloadFontSize($rootScope);
  };
  $scope.increaseSpeakingSpeed = function () {
    increaseSpeakingSpeed(settingService);
    $scope.speakingSpeed = settingService.speakingSpeed;
  };
  $scope.decreaseSpeakingSpeed = function () {
    decreaseSpeakingSpeed(settingService);
    $scope.speakingSpeed = settingService.speakingSpeed;
  };
  // Popover for selecting bible
  $scope.openPopoverBibles = function ($event) {
    var availableBibles = settingService.availableBibles.slice();
    availableBibles.splice(availableBibles.indexOf($scope.primary_bible),1);
    bibleService.popover_bible_open($scope,$event,availableBibles);
  };
  $scope.closePopoverBibles = bibleService.popover_bible_close;

  $scope.selectBible = function (bibleCode) {
    settingService.setSecondaryBible(bibleCode);
    $scope.secondary_bible = bibleCode;
    $scope.closePopoverBibles();
  };
  $scope.toggleDualBible = function () {
    settingService.setDualBible($scope.isDualBible != true);
    $scope.isDualBible = settingService.isDualBible;
  };
});
/**
 * Controller of Bookmark page
 */
app.controller('BookmarkCtrl', function ($rootScope, $scope, $state, $timeout,
                                         settingService, bibleService) {
  $scope.bookmarks = [];
  $scope.isShowDelete = false;
  $scope.init = function () {
    if (window.analytics) window.analytics.trackView('Bookmark Page');
    settingService.getBookmarkHistory('bookmark', 0)
      .then(function (result) {
        $scope.bookmarks = result;
      });
  };
  $scope.deleteAllBookmark = function () {
    settingService.deleteAllBookmarkHistory('bookmark');
    $scope.bookmarks = [];
  };
  $scope.toggleDeleteBtn = function () {
    $scope.isShowDelete = $scope.isShowDelete ? false : true;
  };
  $scope.deleteBookmark = function (bookmarkItem) {
    settingService.deleteBookmarkHistory('bookmark',
      bookmarkItem.book, bookmarkItem.chapter);
    $scope.bookmarks.splice($scope.bookmarks.indexOf(bookmarkItem), 1);
  };
  $scope.restoreBookmarkHistory = function (item) {
    settingService.loading_show();
    settingService.restoreBookmarkHistory($scope,item)
      .then(function () {
        $state.transitionTo('bible.chapter');
      });
  };
});
app.controller('HistoryCtrl', function ($rootScope, $scope, $state, $timeout,
                                        settingService, bibleService) {
  $scope.histories = [];
  $scope.init = function () {
    if (window.analytics) window.analytics.trackView('History Page');
    settingService.getBookmarkHistory('history', 0)
      .then(function (result) {
        $scope.histories = result;
      });
  };
  $scope.deleteAllHistory = function () {
    settingService.deleteAllBookmarkHistory('history');
    $scope.histories = [];
  };
  $scope.restoreBookmarkHistory = function (item) {
    settingService.loading_show();
    settingService.restoreBookmarkHistory($scope,item)
      .then(function () {
        $state.transitionTo('bible.chapter');
      });
  };
});
app.controller('AboutCtrl', function ($rootScope, $scope, settingService) {
  $scope.curVersion = curVersion;
  $scope.rateAppText = rateAppText;
  $scope.appName = appName;
  $scope.init = function () {
    if (window.analytics) window.analytics.trackView('About Page');
  };
  $scope.openModalNotification = function () {
    settingService.modal_notification_open($scope);
  };
  $scope.closeModalNotification = settingService.modal_notification_close;
  $scope.rating = function () {
    AppRate.promptForRating(true);
  };
});
