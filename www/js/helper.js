function initialSetup($rootScope, $ionicModal, settingService, bibleService) {
  settingService.initDb()
    .then(function () {
      settingService.loadAvailableBibles()
        .then(function(bibles){
          if (bibles){
            setInitialDefaultBibles(settingService);
          }
        });
      settingService.getAllConfigs()
        .then(function(configs){
          if (configs){
            // DUAL BIBLE MODE
            settingService.isDualBible = settingService.getBool_True_Result(configs[configuration.dual_bible]);
            // FONT SIZE
            if (configs[configuration.fontSize] && configs[configuration.fontSize].length > 0){
              settingService.fontSize = parseInt(configs[configuration.fontSize]);
            }
            $rootScope.fontSize = settingService.fontSize;
            reloadFontSize($rootScope);
            // SPEED of Speaking
            if (configs[configuration.speakSpeed] && configs[configuration.speakSpeed].length > 0){
              settingService.speakingSpeed = parseFloat(configs[configuration.speakSpeed]);
            }else{
              settingService.speakingSpeed = defaultSpeakingSpeed;
            }
            // PRIMARY BIBLE
            if (configs[configuration.primary_bible] && configs[configuration.primary_bible].length > 0){
              settingService.primary_bible = configs[configuration.primary_bible];
              // if ($appScope) $appScope.primary_bible = settingService.primary_bible;
            }
            // SECONDARY BIBLE
            if (configs[configuration.secondary_bible] && configs[configuration.secondary_bible].length > 0){
              settingService.secondary_bible = configs[configuration.secondary_bible];
              // if ($appScope) $appScope.secondary_bible = settingService.secondary_bible;
            }
            setInitialDefaultBibles(settingService);

            // Checking CURRENT VERSION
            if (!isLatestVersion(configs[configuration.currentVersion])) {
              newInstallUpgrade($rootScope,settingService);
            }
            startApp(settingService, bibleService);
          }
        });
    });
}
var countFunctions2DefaultBible = 0;
function setInitialDefaultBibles(settingService){
  countFunctions2DefaultBible++;
  if (countFunctions2DefaultBible==2){
    var availableBibles = settingService.availableBibles;
    if (settingService.primary_bible==false && availableBibles.length > 0){
      settingService.setPrimaryBible(availableBibles[0]);
    }
    if (settingService.secondary_bible==false && availableBibles.length > 1){
      settingService.setSecondaryBible(availableBibles[1]);
    }
    if ($appScope){
      $appScope.updateScopeVariables();
    }
  }
}
function newInstallUpgrade($rootScope,settingService){
  $rootScope.curVersion = curVersion;
  $rootScope.rateAppText = rateAppText;

  settingService.modal_notification_open($rootScope);
  $rootScope.closeModalNotification = settingService.modal_notification_close;

  settingService.setCurrentVersion();
  $rootScope.rating = function(){ AppRate.promptForRating(true); };
}
function startApp(settingService,bibleService){
  if (settingService.primary_bible){
    settingService.openDb(getBible(settingService.primary_bible).dbFileName, true)
      .then(function(result){
        if (result){
          loadBibleContent(bibleService);
        }
      });
  }
  if (settingService.secondary_bible){
    settingService.openDb(getBible(settingService.secondary_bible).dbFileName, false);
  }
}
function setDefaultBible(bibleService,settingService,bible_code){
  settingService.primary_bible = bible_code;
  if ($appScope) $appScope.primary_bible = settingService.primary_bible;
  settingService.setPrimaryBible(bible_code)
    .then(function (result) {
      if (result) {
        loadBibleContent(bibleService); // loading books & their chapters
      }
    });
}
function loadBibleContent(bibleService) {
  bibleService.loadBooks()
    .then(function () {
      if ($homepageScope){
        $homepageScope.books = bibleService.books;
      }
      bibleService.loadChapters();
    });
}
function getClassFontSize(fontSize){
  return "font_"+fontSize;
}
function reloadFontSize($rootScope) {
  $rootScope.fontSizeClass = getClassFontSize($rootScope.fontSize);
  $rootScope.fontUsageClass = getClassFontSize($rootScope.fontSize-2);
  $rootScope.fontScriptClass = getClassFontSize($rootScope.fontSize-4);
  $rootScope.fontNumberClass = getClassFontSize($rootScope.fontSize-6);
}
function registerHardwardBackBtn($ionicPlatform, $ionicHistory, $state){
  return $ionicPlatform.registerBackButtonAction(function (event) {
    event.preventDefault();
    event.stopPropagation();
    var currentStateName = $ionicHistory.currentStateName();
    $ionicHistory.nextViewOptions({
      historyRoot: true
    });
    if (currentStateName=='app.home') {
      navigator.app.exitApp();
    }
    else if (currentStateName=='default.about'){
      $state.transitionTo('app.home');
    }
    else if (currentStateName=='default.download_bibles'){
      $state.transitionTo('app.home');
    }
    else if (currentStateName=='bible.chapter'){
      $state.transitionTo('app.home');
    }
    else if (currentStateName=='highlight.highlights'){
      $state.transitionTo('app.home');
    }
    else if (currentStateName=='default.search'){
      $state.transitionTo('app.home');
    }
    else if (currentStateName=='default.setting'){
      $state.transitionTo('app.home');
    }
    else if (currentStateName=='default.history'){
      $state.transitionTo('app.home');
    }
    else if (currentStateName=='default.bookmark'){
      $state.transitionTo('app.home');
    }
  }, 500);
}

function isLatestVersion(version){
  return version && version.indexOf(curVersion) > -1;
}

var countAdmob = 0;
function showAdmobInterstitial(){
  if (countAdmob < 3){
    countAdmob++;
    if (isAds && AdMob && countAdmob == 3) {
      AdMob.showInterstitial();
    }
  }
}
function tts(text, speed) {
  var plainText = htmlDecode(text);
  var locale = 'en-US';
  TTS.speak({
    text: plainText.toLowerCase(),
    locale: locale,
    rate: speed
  }, function () {
  }, function (reason) {
    alert(reason);
  });
}
function increaseSpeakingSpeed(settingService){
  settingService.setSpeakingSpeed(settingService.speakingSpeed + 0.25);
  tts("The speed is "+settingService.speakingSpeed,settingService.speakingSpeed);
}
function decreaseSpeakingSpeed(settingService){
  settingService.setSpeakingSpeed(settingService.speakingSpeed - 0.25);
  tts("The speed is "+settingService.speakingSpeed,settingService.speakingSpeed);
}
/*function updateBookmarkStatus($scope,$timeout,settingService,bibleService) {
  $timeout(function () {
    settingService.updateChapterBookmarkStatus();
    $scope.$apply(function () {
      $scope.selectedBook = bibleService.selectedBook;
    });
  },1000);
}*/
function updateChapterBookmarkStatus(bibleService) {
  bibleService.selectedBook.isSelectedChapterBookmarked = bibleService.selectedBook.bookmarks.indexOf(bibleService.selectedBook.chapter) > -1?true:false;
}
function updateBooks($scope,$timeout,bibleService){
  $timeout(function () {
    $scope.$apply(function () {
      $scope.books = bibleService.books;
    });
  },500);
}
function updateSelectedBook($scope,$timeout,bibleService,time){
  $timeout(function () {
    $scope.$apply(function () {
      updateChapterBookmarkStatus(bibleService);
      $scope.selectedBook = bibleService.selectedBook;
    });
  },time);
}
function bolder(sentence,matchingText){
  var re = new RegExp(matchingText, 'ig');
  var match, indexes= [];
  while (match= re.exec(sentence))
    indexes.push([match.index, match[0].length]);
  var plusLength = 0;
  for (var k = 0; k < indexes.length; k++){
    sentence = sentence.replace(sentence.substr(indexes[k][0]+plusLength,indexes[k][1]),'<b>'+sentence.substr(indexes[k][0]+plusLength,indexes[k][1])+'</b>');
    plusLength += 7;  // length of <b></b>
  }
  return sentence;
}
function highlight(sentence,matchingText){
  var re = new RegExp(matchingText, 'ig');
  var match, indexes= [];
  while (match= re.exec(sentence))
    indexes.push([match.index, match[0].length]);
  var plusLength = 0;
  for (var k = 0; k < indexes.length; k++){
    sentence = sentence.replace(sentence.substr(indexes[k][0]+plusLength,indexes[k][1]),"<span class='lightYellowBg'>"+sentence.substr(indexes[k][0]+plusLength,indexes[k][1])+"</span>");
    plusLength += 35;  // length of <span class="lightYellowBg"></span>
  }
  return sentence;
}
function htmlDecode(input){
  return angular.element('<textarea />').html(input).text().replace(/<[^>]+>/gm, '');
}

function toggleGroup(group,element) {
  if (isGroupShown(group,element)) {
    group.splice(group.indexOf(element),1);
  } else{
    group.push(element);
  }
  return group;
}
function isGroupShown(group,element) {
  return group.indexOf(element)>-1?true:false;
}
