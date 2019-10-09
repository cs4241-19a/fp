let timeout;
function trackInfo() {
    let analysis
    let scene,camera,renderer,mesh,mesh2,mesh3,mesh4,mesh5,mesh6;
    let shapes = [];
    let numArray = [];
    let confidence =1;
    (async () => {
        const rawResponse = await fetch('/trackAnalysis', {
            method: 'GET'
        })
        const audioAnalysis = await rawResponse.json()
        //const parsedInput = JSON.parse(input)
        //console.log(audioAnalysis.body.beats)
        analysis = audioAnalysis.body
        let track = audioAnalysis.body.track
        let beats = audioAnalysis.body.beats

        function beatsNum (num){
          return beats[num].confidence
        }

        function randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        //duration of the song is 223 seconds

        const randomNum = function(){
          for (let i=0;i<beats.length;i++){ //track.duration
            numArray.push(randomNumber(65,93))
          }
          //console.log(numArray)
        }
        randomNum()
        //console.log(numArray)

        const init = function (){
          scene = new THREE.Scene()

          camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)

          renderer = new THREE.WebGLRenderer({antialias: true})
          renderer.setSize( window.innerWidth, window.innerHeight )
          //renderer.setClearColor("lightblue");

          $(".background").append( renderer.domElement )

          const light = new THREE.PointLight( "white",1.5,100 )
          light.position.set(10,1,10);

          scene.add( light )

          const light2 = new THREE.PointLight( "white",1.5,100 )
          light2.position.set (35,20,50)
          scene.add(light2);

          const ambLight = new THREE.AmbientLight( "white",0.3,100 )
          ambLight.position.set (5,3,100)
          scene.add(ambLight);

          const geometry = new THREE.IcosahedronGeometry( 7 );
          const material = new THREE.MeshLambertMaterial({ color:"#FE3B53"})

          mesh    = new THREE.Mesh( geometry, material )
          mesh2 = new THREE.Mesh( geometry, material)
          mesh3 = new THREE.Mesh( geometry, material )
          mesh4    = new THREE.Mesh( geometry, material )

          mesh.scale.set(3,3,3)
          mesh2.scale.set(3,3,3)
          mesh3.scale.set(3,3,3)
          mesh4.scale.set(3,3,3)


          const randomPosPerSec = ()=>{
            //barsNum()
            for (let i = 0; i < beats.length; i++) { //numArray.length
                timeout = setTimeout( () =>{ //stores previous number to go to next number

                  mesh.position.x=(beats[i].confidence)*numArray[i]*1.7
                  mesh2.position.y=(beats[i].confidence)*numArray[i]*1.2
                  mesh3.position.z=(beats[i].confidence)*numArray[i]*1.7
                  mesh4.position.y=-1*(beats[i].confidence)*numArray[i]*1.2
                  //console.log(beatsNum(i))
                  //renderer.setClearColor(Math.random()* 0xffffff*beatsNum(i))


                }, i*((1/(track.tempo/60)*1000)) ) //beats per ms
              }
          }

          randomPosPerSec()

          scene.add(mesh,mesh2,mesh3,mesh4)

        }
        const animate = function(){
            requestAnimationFrame(animate);
            mesh.rotation.z += track.tempo_confidence/10
            mesh2.rotation.y +=track.tempo_confidence/10
            mesh3.rotation.x +=track.tempo_confidence/10
            mesh4.rotation.z +=track.tempo_confidence/10



            //let timer = Date.now() * (track.tempo/60000); //gets overall beats per millisecond

            //mesh.position.x= Math.cos(timer)*70
            //mesh2.position.y= Math.cos(timer)*70
            //mesh3.position.z= Math.cos(timer)*70
            //mesh4.position.y= (Math.cos(timer)*70)*-1
            camera.position.x = 150//Math.cos(timer)*20;
            camera.position.z = 150//Math.sin(timer)*50;

            camera.lookAt(scene.position);

            renderer.render(scene,camera);
          }
        const windowResize = function(){
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize( window.innerWidth, window.innerHeight )
        }

        window.addEventListener('resize',windowResize, false);

        init();
        animate();
    })()
}

trackInfo()



