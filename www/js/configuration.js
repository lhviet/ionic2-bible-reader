const configuration = {
  fontSize: "fontSize",
  primary_bible: "primary_bible",
  secondary_bible: "secondary_bible",
  dual_bible: "dual_bible",
  speakSpeed: "speakingSpeed",
  currentVersion: "currentVersion"
};
var bibleDb = false;
var secondBibleDb = false;
var localDb = false;

const defaultSpeakingSpeed = 1;
const defaultFontSize = 18;
const limitHistory = 99;

const curVersion = "2016.04.09";
const appName = "NIV Bible Reader";
const rateAppText = "Click here to leave us a comment and also help others to know how this app will help them.";
const ratingUrlAndroid = 'market://details?id=com.bibooki.mobile.bible.reader.android.google';
const ratingUrliOS = '1047054345';

var isRemoveStrikedText = true;

// for Pro version
const isAds = true;
//var isAds = false;
