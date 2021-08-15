import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { gtm } from '../../services';

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

const writeCanvas = (canvas, songs, points) => {
  const ctx = canvas.getContext('2d');

  const titleSize = 48
  const pointsSize = 36;
  const songSize = 32;
  const lineSize = 36;
  let textY = lineSize + titleSize;
  canvas.width = 720;
  canvas.height = lineSize + titleSize + lineSize + pointsSize + lineSize + songs.length * lineSize + lineSize * 2;
  ctx.fillStyle = '#85674d';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `bold ${titleSize}px Georama, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#e1d3bb';
  ctx.fillText(`You hit ${songs.length} song${songs.length === 1 ? '' : 's'}`,
    canvas.width / 2,
    textY
  );

  ctx.font = `bold ${pointsSize}px Georama, sans-serif`;
  textY += lineSize + pointsSize;
  ctx.fillText(`Total points: ${points}`,
    canvas.width / 2,
    textY
  );

  ctx.font = `italic ${songSize}px Georama, sans-serif`;
  textY += lineSize;
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    textY += lineSize;
    ctx.fillText(song,
      canvas.width / 2,
      textY
    );
  }
};

const Share = (props) => {
  const canvasRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { songs, points, onCanvasRendered } = props;

  useEffect(() => {
    console.log('share init');

    const canvas = canvasRef.current;

    writeCanvas(canvas, songs, points);

    if(canvas.toBlob) {
      canvas.toBlob((blob) => {
        const fileFromBlob = new File([blob], 'results.png', {type: 'image/png'});
        setFile(fileFromBlob);
      });
    }

    if(canvas.toDataURL) {
      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      setImageUrl(image);
    }

    onCanvasRendered();

  }, [songs, points, onCanvasRendered]);

  const handleShareClick = () => {
    if(navigator.canShare?.({files: [file]})) {
      navigator.share({
        text: 'I play Guess Billie Songs and hit this score',
        files: [file],
        title: 'Guess Billie Songs',
        url: 'https://guessbilliesongs.com/',
      }).catch((error) => {
        console.log(error);
        gtm.sendError(error.message);
      });
    }
  };

  const handleSaveScreenshotClick = () => {
    const a = document.createElement('a');
    a.download = 'results.png';
    a.href = imageUrl;
    a.click();
  };

  return (
    <Container>
      { file &&
        <div className="share-button-container">
            <Button onSelect={handleShareClick} type="normal">
              <div className="share-button">
                Share<span className="share-icon material-icons-outlined">share</span>
              </div>
            </Button>
        </div>
      }
      { imageUrl &&
        <div className="share-button-container">  
          <Button onSelect={handleSaveScreenshotClick} type="normal">
            <div className="share-button">
              Save screenshot<span className="share-icon material-icons-outlined">screenshot</span>
            </div>
          </Button>
        </div>
      }
      <canvas className="canvas" ref={canvasRef} />
    </Container>
  );
};

export default Share;