unction testMakeNumberMoreEqual (){
    var t = makeNumberMoreEqual(112, 0, 10);
    for (var i = 0; i < 10; i ++){
      t = makeNumberMoreEqual(t, 0, 10);
      console.log(t);
    }
}
