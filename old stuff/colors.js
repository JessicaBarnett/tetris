var colorGenerator = (function() {

  var colors = {
                  L: '#FFA500', // orange
                  J: '#6678FF', // purply blue
                  I: '#24BDFF', // cyan
                  O: '#FFD700', // yellow
                  S: '#4CE64C', // green
                  Z: '#FF3300', // red
                  T: '#FF66FF' // pink
              },
      randomColor = function(){
        return _.values(colors)[randomNum(6)];
      },
      getColor = function(blockType){
        return colors[blockType]
      };

  return {
    random: randomColor,
    get: getColor
  }
}());
