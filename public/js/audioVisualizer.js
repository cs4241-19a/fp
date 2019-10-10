let timeout;

function trackInfo() {
    let analysis
    let scene, camera, renderer, mesh1, mesh2, mesh3, mesh4;
    let numArray = [];
    let confidence = 1;
    (async () => {
        const rawResponse = await fetch('/trackAnalysis', {
            method: 'GET'
        })
        const audioAnalysis = await rawResponse.json()
        analysis = audioAnalysis.body
        let track = audioAnalysis.body.track
        let beats = audioAnalysis.body.beats

        function randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        const randomNum = function () {
            for (let i = 0; i < beats.length; i++) {
                numArray.push(randomNumber(65, 93))
            }
        }
        randomNum()

        const init = function () {
            scene = new THREE.Scene()
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000)

            renderer = new THREE.WebGLRenderer({antialias: true})
            renderer.setSize(window.innerWidth, window.innerHeight)

            $(".background").append(renderer.domElement)

            const light = new THREE.PointLight("white", 1.5, 100)
            light.position.set(10, 1, 10);

            scene.add(light)

            const light2 = new THREE.PointLight("white", 1.5, 100)
            light2.position.set(35, 20, 50)
            scene.add(light2);

            const ambLight = new THREE.AmbientLight("white", 0.3, 100)
            ambLight.position.set(5, 3, 100)
            scene.add(ambLight);

            const geometry = new THREE.IcosahedronGeometry(7);
            const material = new THREE.MeshLambertMaterial({color: "#FE3B53"})

            mesh1 = new THREE.Mesh(geometry, material)
            mesh2 = new THREE.Mesh(geometry, material)
            mesh3 = new THREE.Mesh(geometry, material)
            mesh4 = new THREE.Mesh(geometry, material)

            mesh1.scale.set(3, 3, 3)
            mesh2.scale.set(3, 3, 3)
            mesh3.scale.set(3, 3, 3)
            mesh4.scale.set(3, 3, 3)


            const randomPosPerSec = () => {
                for (let i = 0; i < beats.length; i++) {
                    timeout = setTimeout(() => { //stores previous number to go to next number

                        mesh1.position.x = (beats[i].confidence) * numArray[i] * 1.7
                        mesh2.position.y = (beats[i].confidence) * numArray[i] * 1.2
                        mesh3.position.z = (beats[i].confidence) * numArray[i] * 1.7
                        mesh4.position.y = -1 * (beats[i].confidence) * numArray[i] * 1.2
                    }, i * ((1 / (track.tempo / 60) * 1000))) //beats per ms
                }
            }

            randomPosPerSec()

            scene.add(mesh1, mesh2, mesh3, mesh4)

        }
        const animate = function () {
            requestAnimationFrame(animate);

            mesh1.rotation.z += track.tempo_confidence / 10
            mesh2.rotation.y += track.tempo_confidence / 10
            mesh3.rotation.x += track.tempo_confidence / 10
            mesh4.rotation.z += track.tempo_confidence / 10

            camera.position.x = 150
            camera.position.z = 150

            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }
        const windowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', windowResize, false);

        init();
        animate();
    })()
}

trackInfo()
