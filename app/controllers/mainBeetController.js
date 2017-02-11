app.controller('mainCtrl', function($http, $scope, $timeout, $interval) {

  console.log("homeCtrl")

  const sounds = {
    kick: 'BD.mp3',
    snare: 'SN.mp3',
    hihat: 'HH.mp3',
    openhihat: 'openHH.mp3'
  };
  const grid = 16;
  const song = 8;
  $scope.bpm = 90

  let intervalId = 0; // becomes the setInterval id



  $scope.newBeet = () => {
      let instruments = {
          kick: {},
          snare: {},
          hihat: {},
          openhihat: {}
        }
        //adding files to instruments object
      for (name in sounds) {
        let sample = new Howl({
            // src: [`/assets/audio/beet/${sounds[name]}`],
            volume: 0.8,
            html5: true
          })
          //combine sample and  name
          // add 16 tracks per row
        for (var i = 0; i < grid; i++) {
          // previously track
          instruments[name][i] = {
              name: name + i,
              sample: sample,
              value: false
            }
            //add tracks to instruments object by name
            // instruments[name].push(track)
        } // end grid for loop
      } //end sounds for in loop
      console.log(instruments)

      // return
      return $scope.instruments = instruments

    } // end newBeet

  //acquire sounds
  $scope.loadPattern = (bpm) => {
      for (instrument in $scope.instruments) {
        for (let i = 0; i < grid; i++) {
          var sound = $scope.instruments[instrument][i].sample
          var value = $scope.instruments[instrument][i].value
          console.log("sound", instrument)
          $scope.playPatternSound(value, sound, i, $scope.play, bpm)
        } //end for loop
      } //end for in loop
    } //end loadPattern
    //stop
  $scope.stop = () => {
      clearInterval(intervalId)
    }
    //play and establish timing
  $scope.play = function() {
    console.log($scope.bpm)
      //establish timing
    let time = 60000 / $scope.bpm
    let measure = time * 4
    let bpm = time / 4
      //grabbing return value ID of interval before firing pattern
    intervalId = setInterval(() => {
      $scope.loadPattern(bpm)
    }, measure)
    console.log("intervalId", intervalId)
  }
  $scope.playPatternSound = function(value, sound, i, playValue, bpm) {
      setTimeout(function() {
        if (value) {
          console.log("playing")
          sound.play() //play sound
        }
      }, bpm * i);
    }
    //save pattern and convert to object

  $scope.save = function() {
    console.log("save")
    //*** NEED TO REMOVE SRC LINE FROM SAMPLE OBJECT BEFORE SENDING****
debugger
    // let beetCopy = Object.assign({}, $scope.instruments)
    $scope.saveThisBeet($scope.instruments)

  } //end save function


  // send savedBeet to firebase
  $scope.saveThisBeet = function(savedBeet) {
    $http.post(`https://beet-35be8.firebaseio.com/userBeets.json`, JSON.stringify(savedBeet))
  }



  // get from firebase object
  //http://stackoverflow.com/questions/6857468/converting-a-js-object-to-an-array


});
