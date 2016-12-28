class MeshGrid {
    
    constructor (width, height, mesh, scene) {
        this.width = width;
        this.height = height;
        this.meshGroup = new THREE.Group();
        this.rowSines = [];
        this.stepSize = 10*(1/height);
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
                //console.log("creating cube at position: " + x + ", " + y);
                meshCopy.translateX((-width/2) + x);
                meshCopy.translateY((-height/2) + y);
                meshCopy.translateZ(Math.sin(sine)*10);
                //meshCopy.position.set(x,y,0);
                meshCopy.scale.set(0.5,0.5,0.5 );

                //meshCopy.position.set(x,y,0);
                //meshCopy.updateMatrix();
                this.meshGroup.add(meshCopy);    
            }
            sine += .2;
        }
    }

    WavePattern() {
        for (var y = 0; y < this.height; y++) {
           this.rowSines[y] += this.stepSize;
            for (var i = 0; i < this.width; i++) {
                var identifier = y*this.height + i;
                this.meshGroup.children[identifier].position.z = Math.sin(this.rowSines[y]) * this.WaveHeight;
                // Begin doing the math to change to bright colors on high altitude
                var heightPct = (this.meshGroup.children[identifier].position.z + this.WaveHeight)/this.WaveHeight;
                var hsl = this.meshGroup.children[identifier].material.color.getHSL();
                this.meshGroup.children[identifier].material.color.setHSL(hsl.s, hsl.l, heightPct);
                this.meshGroup.children[identifier].material.color.setHSL
            }
        }
    }

    getMesh() {
       return this.meshGroup;
    }

    randomGridColor() {
        this.meshGroup.children[1].material.color.setHex(Math.random() * 0xffffff);
        //console.log(this.meshGroup.children[1213].material);
        //for (var i = 0; this.meshGroup.children.length; i++) {
           // console.log(i);
            //meshGroup.children[i].material.color.setHex(Math.random()*0xffffff);
        //}
    }
}
