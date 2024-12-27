const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2) / particleCount * i;
            const speed = Math.random() * 3 + 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            this.particles.push(new Particle(this.x, this.y, vx, vy));
        }
    }

    update() {
        this.particles.forEach(particle => particle.update());
    }

    draw() {
        this.particles.forEach(particle => particle.draw());
    }
}

class Particle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.alpha = 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}

canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    fireworks.push(new Firework(x, y));
});

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.particles.every(particle => particle.alpha <= 0)) {
            fireworks.splice(index, 1);
        }
    });
}

animate();