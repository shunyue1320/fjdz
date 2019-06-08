
var one = document.getElementById('one'),
	haemal = one.querySelector("p"),
	score = one.getElementsByClassName("score")[0],
	tow = document.getElementById('tow'),
	three = document.getElementById('three'),
	air = tow.querySelectorAll(".plane li"),
	start = tow.querySelectorAll(".list li"),
 	Air = 0,	//代表哪架飞机
 	plane = 0,	//第几形态
 	index;
 	var arrPlane = [['img/my1.png','img/my11.png','img/my111.png'],['img/my2.png','img/my22.png','img/my222.png'],['img/my3.png','img/my33.png','img/my333.png'],['img/my4.png','img/my44.png','img/my444.png']],
		arrBullet = [['img/pd1.png','img/pd11.png','img/pd111.png'],['img/pd2.png','img/pd22.png','img/pd222.png'],['img/pd3.png','img/pd33.png','img/pd333.png'],['img/pd4.png','img/pd44.png','img/pd444.png']];
	for (let i=0; i<air.length; i++) {
	 	air[i].onclick = function(){
	 		Air = i;
	 	}
	}
	for (let i=0; i<start.length; i++) {
		index = i
	 	start[i].onclick = function(){
	 		startGame(Air,i);
	 	}
	}

 //开始游戏
function startGame(Air,index){
	one.innerHTML = "";	//清空初始页面
	plane = 0;
	var haemal = document.createElement("div");
	haemal.className = "haemal";
	var score = document.createElement("div");
	score.className = "score";
	var p = document.createElement("p");
	haemal.appendChild(p)
	one.appendChild(haemal);
	one.appendChild(score);
 	tow.style.display = 'none';
 	one.style.display = 'block';
 	one.style.backgroundImage = ['url(img/context1.jpg)','url(img/context2.jpg)','url(img/context3.jpg)','url(img/context4.jpg)','url(img/context5.jpg)'][index];
 	//背景移动
 	var top = 0;
 	one.backgroundMove = setInterval(function(){
 		top = top+1;
 		one.style.backgroundPositionY = top + 'px';
 		if (top>=570) {
 			top = 0;
 		}
 	},1000/60);
 	audio(0);	//背景音乐
 	audio(2);	//背景音乐
 	var myPlane = myAir(Air); //生成我军
 	enemy(index,myPlane); //生成敌军
}
//生成我军  Air：点击第几架飞机
function myAir(Air){
	var myAirPlane = document.createElement("img");
	var speed = 4;	//速度
	myAirPlane.className = "myplane";
	myAirPlane.src = arrPlane[Air][plane];
	myAirPlane.width = 70;
	myAirPlane.height = 50;
	myAirPlane.style.bottom = 5 + 'px';
	myAirPlane.style.left = home.clientWidth/2 - myAirPlane.width/2 + 'px';
	one.appendChild(myAirPlane);
	//键盘移动事件
	document.onkeydown = function (e) {
		e = e || window.event;
		switch (e.keyCode){
			case 37:
			case 65:
				myAirPlane.style.left = Math.max(0,myAirPlane.offsetLeft-5) +'px';
				break;
			case 39:
			case 68:
				myAirPlane.style.left = Math.min(home.clientWidth - myAirPlane.width,myAirPlane.offsetLeft+5) +'px';
				break;
			default:break;
		}
	}
	//触摸移动事件
	one.ontouchstart = function(e){
		if(e.touches[0].screenX < home.clientWidth/2){
			myAirPlane.style.left = Math.max(0,myAirPlane.offsetLeft-5) +'px';
		}else{
			myAirPlane.style.left = Math.min(home.clientWidth - myAirPlane.width,myAirPlane.offsetLeft+5) +'px';
		}
	}
	//生成子弹
	one.bulletTimer = setInterval(function(){
		var myAirBullet = document.createElement("img");
		myAirBullet.className = "myAirBullet";
		myAirBullet.src = arrBullet[Air][plane];
		myAirBullet.width = 10*(1+plane);
		myAirBullet.height = 20*(1+plane);
		myAirBullet.style.top = myAirPlane.offsetTop - myAirBullet.height + 'px';
		myAirBullet.style.left = myAirPlane.offsetLeft + myAirPlane.clientWidth/2 - myAirBullet.width/2 + 'px';
		one.appendChild(myAirBullet);
		//子弹发射
		bulletEmit();
		function bulletEmit(){
			let top = myAirBullet.offsetTop -speed;
			myAirBullet.style.top = top + 'px';
			if(top <= 0){
				//cancelAnimationFrame(motion);//清除运动函数
				one.removeChild(myAirBullet);//清除
				return false;
			}else{
				myAirPlane.parentNode && (myAirBullet.timer = requestAnimationFrame(bulletEmit));
			}
		}
	},400);
	supply(); //生成补给
	return myAirPlane;
}
//生成敌军
function enemy(index,myPlane){
		var score = one.getElementsByClassName("score")[0],
			scoreis = 0;	//计入分数
	one.enemyTimer = setInterval(function(){
		var enemyPlane = document.createElement("img");
		let speed = Math.random()*2+2;//飞机速度
		enemyPlane.src = [['img/fj1.png','img/fj2.png'],['img/fj3.png','img/fj4.png'],['img/fj5.png','img/fj6.png'],['img/fj7.png','img/fj8.png'],['img/fj9.png','img/fj10.png']][index][Math.floor(Math.random()*2)]
		enemyPlane.width = 60;
		enemyPlane.height = 40;
		enemyPlane.style.top = 0;
		enemyPlane.style.left = Math.random()*(home.clientWidth-enemyPlane.width) + 'px';
		one.appendChild(enemyPlane);
		//敌军下落
		enemyplay();
		function enemyplay(){
			enemyPlane.style.top = enemyPlane.offsetTop + speed + 'px';
			if(enemyPlane.offsetTop >= home.clientHeight + enemyPlane.height){
				//cancelAnimationFrame();//清除运动函数
				one.removeChild(enemyPlane);//清除飞机
				return false;
			}else{
				var aBiu = one.getElementsByClassName("myAirBullet");
				//敌军与子弹碰撞
				for(let i=0; i<aBiu.length; i++){
					if(isCollision(aBiu[i],enemyPlane)){
						scoreis++;
						score.innerHTML = scoreis;
						Boom(enemyPlane);	//爆炸效果
						audio(1)	//声音效果
						cancelAnimationFrame(aBiu[i].timer);//清除子弹运动函数
						one.removeChild(enemyPlane);//清除飞机
						one.removeChild(aBiu[i]);//清除子弹
						return false;
					}
				}
				//敌军与我军碰撞 游戏结束
				if(myPlane.parentNode && isCollision(myPlane,enemyPlane)){	//判断我方飞机是否存在 && 是否碰撞
					let dio = one.getElementsByClassName("dio");
					var pp = one.querySelector("p");
					pp.style.width = 0 +"px";
					one.removeChild(dio[0]);
					one.removeChild(dio[0]);
					Boom(enemyPlane);	//敌军爆炸效果
					Boom(myPlane);	//我军爆炸效果
					audio(1);
					clearInterval(one.enemyTimer);	//停止生成敌军
					clearInterval(one.bulletTimer);	//停止生成子弹
					clearInterval(one.backgroundMove);//背景停止
					clearInterval(one.supplyTimer);//补给生成停止
					one.removeChild(myPlane);
					one.removeChild(enemyPlane);
					document.onkeydown = null;	//清除移动事件
					one.ontouchstart = null;
					newscore.innerHTML = scoreis;
					three.style.display = "block";
					return false;
				}
				myPlane.parentNode && requestAnimationFrame(enemyplay);
			}
		};
	},500);
}

//生成补给
function supply(){
	one.supplyTimer = setInterval(function(){
		var loveSupply = document.createElement("img");
		loveSupply.src = "img/love.png";
		loveSupply.width = 60;
		loveSupply.height = 40;
		loveSupply.style.left = -60 + "px";
		loveSupply.style.top = 50+100*Math.random() + "px";
		one.appendChild(loveSupply);
		//补给运动函数
		supplyplay()
		function supplyplay(){
			loveSupply.style.left = loveSupply.offsetLeft + 2 +"px";
			if(loveSupply.offsetLeft >= home.clientWidth + loveSupply.width){
				one.removeChild(loveSupply);
				return false
			}else{
				var aBiu = one.getElementsByClassName("myAirBullet"),
					myplane = one.getElementsByClassName("myplane")[0];
				for (let i=0; i<aBiu.length; i++) {
					if (isCollision(aBiu[i],loveSupply)) {
						cancelAnimationFrame(aBiu[i].timer);	//清除子弹运动函数
						one.removeChild(loveSupply);	//清除飞机
						one.removeChild(aBiu[i]);	//清除子弹
						plane = plane+1 > 2? 0 : plane+1;
						console.log(myplane)
						myplane.src = arrPlane[Air][plane];
						myplane.width = 70*(6+plane)/6;
						myplane.height = 50*(6+plane)/6;
						return false;
					}
				}
				requestAnimationFrame(supplyplay);
			}
		}
	},5000)
}

//碰撞过程
function isCollision(obj,enemy){	//obj:我军或子弹 	 enemy:敌军
	var t1 = obj.offsetTop,
		b1 = obj.offsetTop + obj.height,
		l1 = obj.offsetLeft,
		r1 = obj.offsetLeft + obj.width;
		
	var t2 = enemy.offsetTop,
		b2 = enemy.offsetTop + enemy.height,
		l2 = enemy.offsetLeft,
		r2 = enemy.offsetLeft + enemy.width;
	
	return !(t1 > b2 || l1 > r2 || b1 < t2 || r1 < l2);
}

//爆炸效果
function Boom(obj){
	var blast = document.createElement("img");
	blast.src = "img/blast3.gif";
	blast.width = obj.width;
	blast.height = obj.height;
	blast.style.top = obj.offsetTop + 'px';
	blast.style.left = obj.offsetLeft + 'px';
	one.appendChild(blast);
	setTimeout(function(){
		one.removeChild(blast);
	},800)
}

//声音效果
function audio(n){
	var music = ["audio/bgm.mp3","audio/boom.mp3","audio/bullet.mp3"],
		dio = document.createElement("audio");
	if(n != 1){
		dio.className = "dio"
	}
	dio.src = music[n];
	dio.autoplay = "autoplay";
	dio.loop = "loop";
	one.appendChild(dio);
	if (n==1) {
		setTimeout(function(){
			one.removeChild(dio);
		},800)
	}
}

//点击事件
quit.onclick = function(){
	one.style.display = "none";
	three.style.display = "none";
	tow.style.display = "block";
}