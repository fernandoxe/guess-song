import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .share-button {
    display: flex;
    align-items: center;
    font-style: normal;
    font-size: 1.3rem;
  }
  .share-icon {
    margin-left: 0.5rem;
    font-size: 1.5rem;
  }
  .canvas {
    display: none;
  }
`;

const Share = (props) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    setCtx(ctx);
  }, []);

  const handleButtonClick = () => {
    canvasRef.current.width = '1080';
    canvasRef.current.height = '1920';
    let textY = 100;
    ctx.fillStyle = '#85674d';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.font = 'bold 48px Georama, sans-serif ';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e1d3bb';
    ctx.fillText(`You hit ${props.songs.length} song${props.songs.length === 1 ? '' : 's'}`,
      canvasRef.current.width / 2,
      textY
    );

    ctx.font = '24px Georama, sans-serif ';
    textY += 24;
    for (let i = 0; i < 20; i++) {
      const song = props.songs[0];
      textY += 32;
      ctx.fillText(song,
        canvasRef.current.width / 2,
        textY
      );
    }

    canvasRef.current.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const file = new File([blob], 'results.jpg', {type: 'image/jpg'});
      const filesArray = [file];

      if(navigator.canShare?.({files: filesArray})) {
        navigator.share({
          text: 'I play Guess Billie Songs and hit this score',
          // files: filesArray,
          title: 'Guess Billie Songs',
          url: 'https://guessbilliesongs.com/',
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  };

  return (
    <Container>
      <Button onClick={handleButtonClick} disableEffect>
        <div className="share-button">
          Share<span className="share-icon material-icons-outlined">share</span>
        </div>
      </Button>
      <canvas className="canvas" ref={canvasRef} />
      <div>{error}</div>
    </Container>
  );
};

export default Share;