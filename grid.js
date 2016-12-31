class MeshGrid {

    
    constructor (width, height, mesh, scene) {
        this.width = width;
        this.height = height;
        this.meshGroup = new THREE.Group();
        this.rowSines = [];
        this.stepSize = 10*(1/height);
        this.gridHue = 0;
        this.WaveHeight = 10;
        var sinusValue = 0;
        for (var i = 0; i < height; i++) {
           this.rowSines[i] = sinusValue;
           sinusValue += this.stepSize;
        }
        
        //Initialize
        var sine = 0;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                //Generate meshes
                var meshCopy = mesh.clone();
                meshCopy.material = new THREE.MeshBasicMaterial( {color: 0x00ff00 });
                //console.log("creating cube at position: " + x + ", " + y);
                meshCopy.translateX((-width/2) + x);
                meshCopy.translateY((-height/2) + y);
                meshCopy.translateZ(Math.sin(sine)*this.WaveHeight);
                meshCopy.scale.set(0.5,0.5,0.5 );
                this.meshGroup.add(meshCopy);    
            }
            sine += .2;
        }
        // set position to negative so we can fade in through the fog
        this.meshGroup.position.z = -200;
        console.log(this.meshGroup.position.z);
        console.log("henk");
    }

    WavePattern() {
        for (var y = 0; y < this.height; y++) {
           this.rowSines[y] += this.stepSize;
            for (var i = 0; i < this.width; i++) {
                var identifier = y*this.height + i;
                this.meshGroup.children[identifier].position.z = Math.sin(this.rowSines[y]) * this.WaveHeight;
                // Begin doing the math to change to bright colors on high altitude
                var heightPct = (this.meshGroup.children[identifier].position.z+this.WaveHeight)/(this.WaveHeight*2);
                if (heightPct <= .02 )
                    heightPct = .02;
                else if (heightPct >= .8)
                    heightPct =.8;
                var hsl = this.meshGroup.children[identifier].material.color.getHSL();
                this.meshGroup.children[identifier].material.color.setHSL(this.gridHue, 1, heightPct);
            }
        }
    }

    getMesh() {
       return this.meshGroup;
    }

    randomGridColor() {
        this.gridHue = Math.random();
        this.meshGroup.children[1].material.color.setHSL(this.gridHue, 1.0, 1.0);
    }
}
