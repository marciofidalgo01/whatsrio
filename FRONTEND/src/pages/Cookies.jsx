import "../styles/Cookies.css";
import "../styles/global.css";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Cookies() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = { x: null, y: null, radius: 160 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let bubbles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.1,
      color: `rgba(8,206,8,${Math.random() * 0.5 + 0.3})`,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        b.y -= b.speed;
        if (b.y < -b.r) b.y = canvas.height + b.r;

        if (mouse.x !== null && mouse.y !== null) {
          let dx = b.x - mouse.x;
          let dy = b.y - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            let force = (mouse.radius - dist) / mouse.radius;
            let angle = Math.atan2(dy, dx);

            let moveX = Math.cos(angle) * force * 3;
            let moveY = Math.sin(angle) * force * 3;

            b.x += moveX;
            b.y += moveY;
          }
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function revokeConsent() {
    localStorage.removeItem("cookieConsent");
    alert("Consentimento revogado!");
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <div className="content-box">
        <h1>Política de Cookies</h1>

        <p>
          O site <span className="span2">WhatsRioMóveis</span> utiliza cookies
          para melhorar sua experiência e realizar análises estatísticas através
          do Google Analytics. Utilizamos somente cookies de medição — nenhum
          deles coleta informações pessoais que identifiquem você diretamente.
        </p>

        <h2>
          Cookies utilizados pelo{" "}
          <span className="span2">Google Analytics</span>
        </h2>

        <ul>
          <li>
            <strong>_ga</strong> — identifica usuários de forma anônima (2 anos)
          </li>
          <li>
            <strong>_gid</strong> — identifica usuários de forma anônima (24h)
          </li>
          <li>
            <strong>_gat</strong> — reduz requisições (1 minuto)
          </li>
        </ul>

        <p>
          Caso deseje, você pode revogar sua permissão a qualquer momento
          clicando no botão abaixo.
        </p>

        <button onClick={revokeConsent} className="revoke-btn">
          Revogar consentimento e limpar cookies
        </button> 

        <button className="retornarContainer">
           <Link to="/">Voltar para página inicial</Link>
        </button>

      </div>
    </>
  );
}