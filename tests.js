unction testMakeNumberMoreEqual (){
    var t = makeNumberMoreEqual(112, 0, 10);
    for (var i = 0; i < 10; i ++){
      t = makeNumberMoreEqual(t, 0, 10);
      console.log(t);
    }
}



function testCollisions() {
  test1 = [new BabyBalloon(5, 5), new BabyBalloon(10, 10)];
  console.log(haveCollided(test1[0], test1[1]))
}
