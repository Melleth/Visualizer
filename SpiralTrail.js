class SpiralTrail {
    constructor(length, width) {
        this.length = length;
        this.width = width;
        this.particles = new THREE.Geometry();
        
        // Fill the particles
        var counter = 0;
        for (var i = 0; i < this.length; i++) {
            var x = Math.cos(counter)*this.width;
            var y = Math.sin(counter)*this.width;
            this.particles.vertices.push(new THREE.Vector3(x,y,i));
            counter+= .2;
        }
        console.log(this.particles);
        var map = null;
        var texture = new THREE.TextureLoader().load("img/particle.png");
        this.particleMaterial = new THREE.PointsMaterial(
            {color: 0xffffff,
             size: 2,
             map: texture,
             blending: THREE.AdditiveBlending,
             transparent: true,
            });
         this.particleSystem = new THREE.Points(this.particles, this.particleMaterial); 
         //set the z position negative so we can fade in on first spawn
         this.particleSystem.position.z = -length - 200;
    }

    getMesh() {
        return this.meshGroup;
    }
}
