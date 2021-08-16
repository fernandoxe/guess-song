import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { gtm } from '../../services';
import { useTranslation } from 'react-i18next';
import background from '../../img/background.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .share-button-container {
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
  .canvas, .image {
    display: none;
  }
`;

const writeCanvas = (canvas, songs, image, guessedText, pointsText) => {
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

  ctx.drawImage(image, 0, -148, 720, 1280);

  ctx.font = `bold ${titleSize}px Georama, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#e1d3bb';
  ctx.fillText(guessedText,
    canvas.width / 2,
    textY
  );

  ctx.font = `bold ${pointsSize}px Georama, sans-serif`;
  textY += lineSize + pointsSize;
  ctx.fillText(pointsText,
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
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { songs, points, onCanvasRendered } = props;

  useEffect(() => {
    console.log('share init');

    const canvas = canvasRef.current;

    writeCanvas(
      canvas,
      songs,
      imageRef.current,
      t('X guessed songs', {count: songs.length}),
      t('Total score', {count: points})
    );

    if(canvas.toBlob) {
      canvas.toBlob((blob) => {
        const fileFromBlob = new File([blob], 'results.jpg', {type: 'image/jpeg'});
        setFile(fileFromBlob);
      });
    } else {
      gtm.sendError('Can\'t create canvas.toBlob');
    }

    if(canvas.toDataURL) {
      const image = canvas.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
      setImageUrl(image);
    } else {
      gtm.sendError('Can\'t create canvas.toDataUrl');
    }

    onCanvasRendered();

  }, [songs, points, onCanvasRendered, t]);

  const handleShareClick = () => {
    gtm.share();
    if(navigator.canShare?.({files: [file]})) {
      navigator.share({
        text: t('My score'),
        files: [file],
        title: process.env.REACT_APP_TITLE,
        url: process.env.REACT_APP_URL,
      })
      .then(() => {
        gtm.shareSuccessful();
      })
      .catch((error) => {
        console.log(error);
        gtm.sendError(error.message);
      });
    } else {
      gtm.sendError(`Navigator can't share${navigator.canShare?.() ? '' : ' files'}`);
    }
  };

  const handleSaveScreenshotClick = () => {
    try {
      const a = document.createElement('a');
      a.download = 'results.jpg';
      a.href = imageUrl;
      a.click();
      gtm.saveScreenshot();
    } catch(error) {
      console.log(error);
      gtm.sendError(error.message);
    }
  };

  return (
    <Container>
      { file &&
        <div className="share-button-container">
            <Button onSelect={handleShareClick} type="normal">
              <div className="share-button">
                {t('Share')}<span className="share-icon material-icons-outlined">share</span>
              </div>
            </Button>
        </div>
      }
      { imageUrl &&
        <div className="share-button-container">  
          <Button onSelect={handleSaveScreenshotClick} type="normal">
            <div className="share-button">
            {t('Save screenshot')}<span className="share-icon material-icons-outlined">screenshot</span>
            </div>
          </Button>
        </div>
      }
      <canvas className="canvas" ref={canvasRef} />
      <img
        className="image"
        src={background}
        alt=""
        ref={imageRef}
      />
    </Container>
  );
};

export default Share;