import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .share-button-container:first-child {
    margin-bottom: 1.5rem;
  }

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

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    setCtx(ctx);
  }, []);

  const writeCanvas = () => {
    canvasRef.current.width = '720';
    canvasRef.current.height = '1280';
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
    for (let i = 0; i < props.songs.length; i++) {
      const song = props.songs[i];
      textY += 32;
      ctx.fillText(song,
        canvasRef.current.width / 2,
        textY
      );
    }
  };

  const handleShareClick = () => {
    writeCanvas();
    canvasRef.current.toBlob((blob) => {
      // const url = URL.createObjectURL(blob);
      const file = new File([blob], 'results.png', {type: 'image/png'});
      const filesArray = [file];

      if(navigator.canShare?.({files: filesArray})) {
        navigator.share({
          text: 'I play Guess Billie Songs and hit this score',
          files: filesArray,
          title: 'Guess Billie Songs',
          url: 'https://guessbilliesongs.com/',
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  };

  const handleSaveScreenshotClick = () => {
    writeCanvas();
    const image = canvasRef.current.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    const a = document.createElement('a');
    a.download = 'image.png';
    a.href = image;
    a.style.display = 'none';
    document.querySelector('body').appendChild(a);
    a.click();
  };

  return (
    <Container>
      <div className="share-button-container">
        <Button onClick={handleShareClick} type="normal">
          <div className="share-button">
            Share<span className="share-icon material-icons-outlined">share</span>
          </div>
        </Button>
      </div>
      <div className="share-button-container">  
        <Button onClick={handleSaveScreenshotClick} type="normal">
          <div className="share-button">
            Save screenshot<span className="share-icon material-icons-outlined">screenshot</span>
          </div>
        </Button>
      </div>
      <canvas className="canvas" ref={canvasRef} />
    </Container>
  );
};

export default Share;