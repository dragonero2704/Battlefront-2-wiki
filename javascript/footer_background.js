const canvas = document.getElementById('canvas1')
    // let canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')


canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight
canvas.LocationX = canvas.getBoundingClientRect().x
canvas.LocationY = canvas.getBoundingClientRect().y



let particlesArray = [];

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 50) * (canvas.width / 50)
}

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x
    mouse.y = event.y
        // console.log(mouse.x)
        // console.log(mouse.y)
});

class Particle {
    constructor(x, y, directionx, directiony, size, color) {
        this.x = x;
        this.y = y;
        this.directionx = directionx;
        this.directiony = directiony;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionx = -this.directionx;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directiony = -this.directiony
        }
        //Circle collision detection
        // let dx = (mouse.x - canvas.LocationX) - this.x;
        // let dy = (mouse.y - canvas.LocationY) - this.y;
        // let distance = Math.sqrt(dx * dx + dy * dy);

        // if (distance < mouse.radius + this.size) {
        //     //check which direction to move
        //     console.log('collsion detected')
        //     if (this.x > (mouse.x - canvas.LocationX) && this.x < canvas.width - (this.size * 10 + 100)) {
        //         // this.x += 10;
        //         this.x += 10
        //     }
        //     if (this.x < (mouse.x - canvas.LocationX) && this.x > (this.size * 10 + 10)) {
        //         this.x -= 10;
        //     }
        //     if (this.y > (mouse.y - canvas.LocationY) && this.y < canvas.height - (this.size * 10 + 10)) {
        //         this.y += 10
        //     }
        //     if (this.y < (mouse.y - canvas.LocationY) && this.y > (this.size * 10 + 10)) {
        //         this.y -= 10;
        //     }
        //     this.draw()
        //     return
        // }

        this.x += this.directionx;
        this.y += this.directiony;

        this.draw()
    }
}

function init() {
    particlesArray = [];
    let particlesnumber = canvas.width * canvas.height / 5000;
    for (let i = 0; i < particlesnumber; i++) {
        let size = (Math.random() * 2) + 0.3;
        // let size = 0.2;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionx = (Math.random() * 5) - 2.5;
        let directiony = (Math.random() * 5) - 2.5;
        let color = '#ffffff'

        particlesArray.push(new Particle(x, y, directionx, directiony, size, color))
    }
}

//animation loop
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

function connect() {
    let opacityvalue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            let maxd = (canvas.width / 5) * (canvas.height / 5);

            if (distance < maxd) {
                opacityvalue = 1 - (distance / (canvas.width * canvas.height / 25))
                ctx.strokeStyle = `rgb(255,255,255, ${opacityvalue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }

        }
    }
}

window.addEventListener('resize', function() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    mouse.radius = (canvas.height / 100) * (canvas.width / 100)
    init()
})

canvas.addEventListener('mouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

init()
animate()